// backend/index.js

const express = require("express");
const cors = require("cors");
const { ethers } = require("ethers");
const admin = require("firebase-admin");
const multer = require("multer");
const fs = require("fs");
const { google } = require("googleapis");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// ---------------- Firebase Setup -------------------
const serviceAccount = require("./firebase-admin.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "trustchain-28500.appspot.com"
});

const firestore = admin.firestore();
const bucket = admin.storage().bucket();

// ---------------- Blockchain Setup -------------------
const provider = new ethers.providers.JsonRpcProvider("https://goerli.infura.io/v3/" + process.env.INFURA_API_KEY);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const TrustChainABI = require("./TrustChainABI.json");
const signer = wallet.connect(provider);
const contractAddress = process.env.CONTRACT_ADDRESS;
const trustChainContract = new ethers.Contract(contractAddress, TrustChainABI.abi, signer);


// ---------------- Google Drive Setup -------------------
const auth = new google.auth.GoogleAuth({
  keyFile: "gdriveKey.json",
  scopes: ["https://www.googleapis.com/auth/drive.file"]
});
const drive = google.drive({ version: "v3", auth });

// ---------------- File Upload Setup -------------------
const upload = multer({ dest: "uploads/" });

// ---------------- Routes -------------------

app.post("/upload-certificate", upload.single("file"), async (req, res) => {
  try {
    const filePath = req.file.path;
    const fileMetaData = {
      name: req.file.originalname,
      parents: [process.env.GDRIVE_FOLDER_ID]
    };
    const media = {
      mimeType: req.file.mimetype,
      body: fs.createReadStream(filePath)
    };

    const driveResponse = await drive.files.create({
      resource: fileMetaData,
      media: media,
      fields: "id"
    });

    fs.unlinkSync(filePath);

    const fileId = driveResponse.data.id;
    const fileUrl = `https://drive.google.com/uc?id=${fileId}`;

    const { studentWallet, certificateHash } = req.body;

    // Interact with Smart Contract
    const tx = await trustChainContract.issueCertificate(studentWallet, certificateHash, fileUrl);
    await tx.wait();

    // Save to Firestore
    await firestore.collection("certificates").add({
      studentWallet,
      certificateHash,
      fileUrl,
      timestamp: new Date().toISOString()
    });

    res.status(200).send({ message: "Certificate uploaded and blockchain updated.", fileUrl });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Something went wrong." });
  }
});

app.get("/verify/:hash", async (req, res) => {
  try {
    const hash = req.params.hash;
    const cert = await trustChainContract.getCertificateByHash(hash);
    res.status(200).send(cert);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Certificate not found." });
  }
});

// ---------------- Server -------------------

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
