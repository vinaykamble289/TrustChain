
import express from 'express';
import cors from 'cors';
import multer from 'multer';
import fs from 'fs';
import dotenv from 'dotenv';
import { google } from 'googleapis';
import { JsonRpcProvider } from 'ethers';
import crypto from 'crypto';
import { ethers } from 'ethers';
import path from 'path';
import { fileURLToPath } from 'url';
import TrustChainABI from './TrustChainABI.json' assert { type: 'json' };
import serviceAccount from './gdrive-service.json' assert { type: 'json' };

dotenv.config();

const {
  PRIVATE_KEY,
  CONTRACT_ADDRESS,
  GDRIVE_FOLDER_ID,
  PORT = 5000
} = process.env;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ dest: 'uploads/' });

const provider = new JsonRpcProvider("http://127.0.0.1:8545");
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
const contract = new ethers.Contract(CONTRACT_ADDRESS, TrustChainABI.abi, wallet);

const auth = new google.auth.GoogleAuth({
  credentials: serviceAccount,
  scopes: ['https://www.googleapis.com/auth/drive']
});
const drive = google.drive({ version: 'v3', auth });

const uploadToDrive = async (file) => {
  const fileMetadata = {
    name: `${Date.now()}_${file.originalname}`,
    parents: [GDRIVE_FOLDER_ID]
  };

  const media = {
    mimeType: file.mimetype,
    body: fs.createReadStream(file.path)
  };

  try {
    const response = await drive.files.create({
      resource: fileMetadata,
      media: media,
      fields: 'id'
    });

    const fileId = response.data.id;
    console.log(`File uploaded to Google Drive: ${fileId}`);
    const link = `https://drive.google.com/uc?id=${fileId}&export=download`;
    return link;
  } catch (error) {
    console.error('Upload to Google Drive failed:', error);
    throw error;
  }
};

app.post('/upload-certificate', upload.single('certificate'), async (req, res) => {
  try {
    const { studentName, studentPRN, studentEmail, certificateName, issueDate, semester, uploadedBy } = req.body;
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

    const fileUrl = await uploadToDrive(req.file);
    const certData = `${studentPRN}-${certificateName}-${issueDate}`;
    const certHash = crypto.createHash('sha256').update(certData).digest('hex');

    const tx = await contract.recordCertificate(studentPRN, studentName, certHash);
    await tx.wait();

    await fs.promises.unlink(req.file.path);

    res.status(200).json({
      message: 'Certificate uploaded and recorded on blockchain',
      txHash: tx.hash,
      fileUrl,
      certHash
    });
  } catch (error) {
    if (req.file) await fs.promises.unlink(req.file.path);
    console.error('Certificate upload error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

app.get('/verify/:hash', async (req, res) => {
  try {
    const certHash = req.params.hash;
    const certData = await contract.getCertificate(certHash);

    if (certData.studentPRN && certData.studentPRN !== '') {
      res.status(200).json({
        blockchainVerified: true,
        blockchainData: certData
      });
    } else {
      res.status(404).json({ message: 'Certificate not found on blockchain' });
    }
  } catch (err) {
    console.error('Verify error:', err);
    res.status(500).json({ message: 'Error verifying certificate', error: err.message });
  }
});

app.get('/test-blockchain', async (req, res) => {
  try {
    const network = await provider.getNetwork();
    const walletAddress = await wallet.getAddress();
    const balance = await provider.getBalance(walletAddress);
    
    res.status(200).json({
      message: 'Blockchain connection working correctly',
      network: network.name,
      walletAddress,
      balance: ethers.formatEther(balance) + ' ETH'
    });
  } catch (error) {
    console.error('Blockchain test error:', error);
    res.status(500).json({ message: 'Blockchain connection error', error: error.message });
  }
});

app.post('/test-drive', upload.single('testfile'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

    const fileUrl = await uploadToDrive(req.file);
    await fs.promises.unlink(req.file.path);

    res.status(200).json({
      message: 'Test file uploaded to Google Drive',
      fileUrl
    });
  } catch (error) {
    if (req.file) await fs.promises.unlink(req.file.path);
    console.error('Drive upload test error:', error);
    res.status(500).json({ message: 'Drive upload error', error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
