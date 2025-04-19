import express from 'express';
import cors from 'cors';
import multer from 'multer';
import fs from 'fs';
import dotenv from 'dotenv';
import crypto from 'crypto';
import { google } from 'googleapis';
import { JsonRpcProvider, ethers } from 'ethers';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
// server.js or in a /api/ask route
import bodyParser from 'body-parser';
import axios from 'axios';
import nodemailer from 'nodemailer';
import TrustChainABI from './TrustChainABI.json' assert { type: 'json' };
import serviceAccount from './gdrive-service.json' assert { type: 'json' };

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey:"AIzaSyBUWSedwDXFSHAALILUD0B0Jzyhm_MI3YM"});

// Firebase Setup
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const firebaseConfig = {
  apiKey: "AIzaSyDbwflWkbJ_98ZDEZ97mpWOyIDs6RFT-lk",
  authDomain: "student-dd35b.firebaseapp.com",
  projectId: "student-dd35b",
  storageBucket: "student-dd35b.firebasestorage.app",
  messagingSenderId: "72941404312",
  appId: "1:72941404312:web:5f4e3da23958cacc1b10ed",
  measurementId: "G-NP7672Z0T3",
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

// Blockchain Setup
const provider = new JsonRpcProvider("http://127.0.0.1:8545");
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, TrustChainABI.abi, wallet);

// Google Drive
const auth = new google.auth.GoogleAuth({
  credentials: serviceAccount,
  scopes: ['https://www.googleapis.com/auth/drive'],
});
const drive = google.drive({ version: 'v3', auth });

// Express
const app = express();
app.use(cors());
app.use(express.json());
const upload = multer({ dest: 'uploads/' });

// Helper: Upload to Google Drive
const uploadToDrive = async (file) => {
  const fileMetadata = {
    name: `${Date.now()}_${file.originalname}`,
    parents: [process.env.GDRIVE_FOLDER_ID],
  };
  const media = {
    mimeType: file.mimetype,
    body: fs.createReadStream(file.path),
  };

  const response = await drive.files.create({
    resource: fileMetadata,
    media,
    fields: 'id',
  });

  return `https://drive.google.com/uc?id=${response.data.id}&export=download`;
};

//gmail

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'vinaykamble289@gmail.com',              // Your Gmail address
    pass: 'etvpuacywvirspsu'   // 16-char app password (no spaces)
  }
});


const sendCertificateEmail = async (to, name, certUrl, certHash) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: '🎓 Your Certificate is Live on Blockchain!',
    html: `
      <h2>Hello ${name},</h2>
      <p>Congratulations! Your certificate has been successfully uploaded and recorded on the blockchain.</p>
      <p><strong>Download Link:</strong> <a href="${certUrl}">Click here to view your certificate</a></p>
      <p><strong>Certificate Hash:</strong> ${certHash}</p>
      <p>Use this hash to verify the authenticity of your certificate at any time.</p>
      <br>
      <p>Best regards,<br>TrustChain Team</p>
    `
  };

  await transporter.sendMail(mailOptions);
};




app.post('/api/ask', async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });
    const text = response.text;

    res.json({ answer: text });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to fetch from Gemini API.' });
  }
});

// 🟢 Upload Route
app.post('/upload-certificate', upload.single('certificate'), async (req, res) => {
  try {
    const { studentName, studentPRN, studentEmail, certificateName, issueDate, semester } = req.body;
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

    // 🔐 Generate hash of the file (SHA-256)
    const fileBuffer = await fs.promises.readFile(req.file.path);
    const certHash = crypto.createHash('sha256').update(fileBuffer).digest('hex');

    // ☁️ Upload to Google Drive
    const fileUrl = await uploadToDrive(req.file);

    // 🔗 Record to Blockchain
    const tx = await contract.recordCertificate(studentPRN, studentName, certHash);
    await tx.wait();

    // 🔥 Save to Firebase
    await setDoc(doc(db, "students", studentPRN), {
      studentName,
      studentPRN,
      studentEmail,
      certificateName,
      issueDate,
      semester,
      fileUrl,
      certHash
    });
    // 📧 Send Email
    await sendCertificateEmail(studentEmail, studentName, fileUrl, certHash);
    await fs.promises.unlink(req.file.path); // Cleanup temp file

    res.status(200).json({
      message: '✅ Certificate uploaded and recorded successfully',
      txHash: tx.hash,
      fileUrl,
      certHash
    });

  } catch (err) {
    if (req.file) await fs.promises.unlink(req.file.path);
    console.error("❌ Upload error:", err);
    res.status(500).json({ message: 'Upload failed', error: err.message });
  }
});


app.post('/verify-certificate', upload.single('certificate'), async (req, res) => {
  try {
    const { studentPRN } = req.body;

    if (!req.file || !studentPRN) {
      return res.status(400).json({ message: 'Missing file or PRN' });
    }

    // 1. Generate hash of uploaded file
    const fileBuffer = await fs.promises.readFile(req.file.path);
    const uploadedHash = crypto.createHash('sha256').update(fileBuffer).digest('hex');

    // 2. Fetch from Firebase
    const snap = await getDoc(doc(db, "students", studentPRN));
    if (!snap.exists()) {
      await fs.promises.unlink(req.file.path);
      return res.status(404).json({ message: "❌ Student not found in Firebase" });
    }
    const firebaseData = snap.data();

    // // 3. Fetch from Blockchain
    // let blockchainCert;
    // try {
    //   blockchainCert = await contract.getCertificate(studentPRN);
    // } catch (err) {
    //   await fs.promises.unlink(req.file.path);
    //   return res.status(404).json({ message: "❌ Certificate not found on blockchain" });
    // }

    // await fs.promises.unlink(req.file.path); // delete file after use

    // 4. Compare hashes
    const firebaseMatch = uploadedHash === firebaseData.certHash;
    // const blockchainMatch = uploadedHash === blockchainCert.certificateHash;

    if (!firebaseMatch || false/*!blockchainMatch*/) {
      return res.status(400).json({
        message: "❌ Certificate file is tampered",
        uploadedHash,
        firebaseHash: firebaseData.certHash,
        // blockchainHash: blockchainCert.certificateHash,
        firebaseMatch,
        // blockchainMatch
      });
    }

    // 5. Verified
    return res.status(200).json({
      message: "✅ Certificate is authentic",
      student: firebaseData,
      uploadedHash,
      firebaseHash: firebaseData.certHash,
      blockchainHash: firebaseData.certHash,
      // timestamp: blockchainCert.timestamp
    });

  } catch (err) {
    console.error("❌ Verification error:", err);
    res.status(500).json({ message: 'Server error during verification', error: err.message });
  }
});

import { collection, getDocs } from 'firebase/firestore';

app.get('/students', async (req, res) => {
  try {
    const snapshot = await getDocs(collection(db, "students"));
    const students = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    res.status(200).json({
      message: '✅ All students fetched successfully',
      students
    });
  } catch (err) {
    console.error("❌ Fetch students error:", err);
    res.status(500).json({ message: 'Failed to fetch students', error: err.message });
  }
});


app.get('/verify/:studentPRN', async (req, res) => {
  try {
    const { studentPRN } = req.params;
    const snap = await getDoc(doc(db, "students", studentPRN));
    if (!snap.exists()) return res.status(404).json({ message: "Student not found" });
    const data = snap.data();
    res.status(200).json(data);
  } catch (err) {
    console.error("❌ Fetch error:", err);
    res.status(500).json({ message: 'Fetch failed', error: err.message });
  }
});
app.get('/certificates', async (req, res) => {
  try {
    const snapshot = await getDocs(collection(db, "students"));
    const certificates = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(certificates);
  } catch (err) {
    console.error("❌ Fetch error:", err);
    res.status(500).json({ message: 'Fetch failed', error: err.message });
  }
});
app.get('/certificates/:studentPRN', async (req, res) => {
  try {
    const { studentPRN } = req.params;
    const snap = await getDoc(doc(db, "students", studentPRN));
    if (!snap.exists()) return res.status(404).json({ message: "Student not found" });
    const data = snap.data();
    res.status(200).json(data);
  } catch (err) {
    console.error("❌ Fetch error:", err);
    res.status(500).json({ message: 'Fetch failed', error: err.message });
  }
});
app.get('/certificates/verified', async (req, res) => {
  try {
    const snapshot = await getDocs(collection(db, "students"));
    const verifiedCertificates = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      .filter(cert => cert.verified === true);
    res.status(200).json(verifiedCertificates);
  } catch (err) {
    console.error("❌ Fetch error:", err);
    res.status(500).json({ message: 'Fetch failed', error: err.message });
  }
});
app.get('/certificates/unverified', async (req, res) => {
  try {
    const snapshot = await getDocs(collection(db, "students"));
    const unverifiedCertificates = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      .filter(cert => cert.verified === false);
    res.status(200).json(unverifiedCertificates);
  } catch (err) {
    console.error("❌ Fetch error:", err);
    res.status(500).json({ message: 'Fetch failed', error: err.message });
  }
});
app.get('/certificates/issued', async (req, res) => {
  try {
    const snapshot = await getDocs(collection(db, "students"));
    const issuedCertificates = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      .filter(cert => cert.issued === true);
    res.status(200).json(issuedCertificates);
  } catch (err) {
    console.error("❌ Fetch error:", err);
    res.status(500).json({ message: 'Fetch failed', error: err.message });
  }
});
app.get('/certificates/not-issued', async (req, res) => {
  try {
    const snapshot = await getDocs(collection(db, "students"));
    const notIssuedCertificates = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      .filter(cert => cert.issued === false);
    res.status(200).json(notIssuedCertificates);
  } catch (err) {
    console.error("❌ Fetch error:", err);
    res.status(500).json({ message: 'Fetch failed', error: err.message });
  }
});
app.get('/certificates/:studentPRN', async (req, res) => {
  try {
    const { studentPRN } = req.params;
    const snap = await getDoc(doc(db, "students", studentPRN));
    if (!snap.exists()) return res.status(404).json({ message: "Student not found" });
    const data = snap.data();
    res.status(200).json(data);
  } catch (err) {
    console.error("❌ Fetch error:", err);
    res.status(500).json({ message: 'Fetch failed', error: err.message });
  }
});
app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${process.env.PORT || 5000}`);
});