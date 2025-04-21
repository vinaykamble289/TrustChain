



// require('dotenv').config();
// const express = require('express');
// const cors = require('cors');
// const multer = require('multer');
// const admin = require('firebase-admin');
// const { Web3 } = require('web3');
// const fs = require('fs');
// const { Contract,Wallet,JsonRpcProvider } = 'ethers';

// // Firebase Setup
// const serviceAccount = require('./firebase-admin.json');
// admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
// const db = admin.firestore();

// // Web3 & Blockchain
// const web3 = new Web3(process.env.INFURA_URL);
// const account = web3.eth.accounts.privateKeyToAccount(process.env.PRIVATE_KEY);
// web3.eth.accounts.wallet.add(account);
// const provider = new JsonRpcProvider("http://127.0.0.1:8545");
// const wallet = new Wallet(process.env.PRIVATE_KEY, provider);
// const contract = new Contract(process.env.CONTRACT_ADDRESS, TrustChainABI.abi, wallet);


// // Express Config
// const app = express();
// app.use(cors());
// app.use(express.json());

// // File Uploads
// const upload = multer({ dest: 'uploads/' });

// // Routes
// require('./routes.cjs')(app, db, upload, contract, account, web3);

// app.listen(process.env.PORT, () => {
//   console.log(`Server running at http://localhost:${process.env.PORT}`);
// });



// Imports
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
import bodyParser from 'body-parser';
import axios from 'axios';
import nodemailer from 'nodemailer';
import TrustChainABI from './TrustChainABI.json' assert { type: 'json' };
import serviceAccount from './gdrive-service.json' assert { type: 'json' };
import { GoogleGenerativeAI } from '@google/generative-ai';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, getDoc, collection, getDocs } from 'firebase/firestore';

// Config
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDbwflWkbJ_98ZDEZ97mpWOyIDs6RFT-lk",
  authDomain: "student-dd35b.firebaseapp.com",
  projectId: "student-dd35b",
  storageBucket: "student-dd35b.appspot.com",
  messagingSenderId: "72941404312",
  appId: "1:72941404312:web:5f4e3da23958cacc1b10ed",
  measurementId: "G-NP7672Z0T3",
};
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

// Blockchain
const provider = new JsonRpcProvider("http://127.0.0.1:8545");
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, TrustChainABI.abi, wallet);

// Google Drive
const auth = new google.auth.GoogleAuth({
  credentials: serviceAccount,
  scopes: ['https://www.googleapis.com/auth/drive'],
});
const drive = google.drive({ version: 'v3', auth });


// Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

// Express
const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
const upload = multer({ dest: 'uploads/' });

// Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: "vinaykamble289@gmail.com",
    pass: "undb iwpw acfc oxxz"
  }
});

// Upload to Google Drive
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


const mailOptions = {
  from: 'vinaykamble289@gmail.com',
  to: 'vinaykamble289@gmail.com',
  subject: '🎓 Your Certificate is Live on Blockchain!',
  html: `
    <h2>Hello ,</h2>

  `
};
// Email certificate
const sendCertificateEmail = async (to, name, certUrl, certHash) => {
  const mailOptions = {
    from: 'vinaykamble289@gmail.com',
    to,
    subject: '🎓 Your Certificate is Live on Blockchain!',
    html: `
      <h2>Hello ${name},</h2>
      <p>Your certificate has been successfully uploaded and recorded on the blockchain.</p>
      <p><strong>Download Link:</strong> <a href="${certUrl}">Click here</a></p>
      <p><strong>Certificate Hash:</strong> ${certHash}</p>
      <p>Regards,<br>TrustChain Team</p>
    `
  };
  await transporter.sendMail(mailOptions);
  console.log("mail send");
};




// =====================================
// 🧑 Add Single Student
// =====================================
app.post('/add-student', async (req, res) => {
  const { studentPRN, studentName, studentEmail } = req.body;
  if (!studentPRN || !studentName || !studentEmail) {
    return res.status(400).json({ message: "Missing student fields" });
  }

  try {
    const studentRef = doc(db, "students", studentPRN);
    const snapshot = await getDoc(studentRef);

    if (snapshot.exists()) {
      return res.status(409).json({ message: "Student already exists" });
    }

    await setDoc(studentRef, {
      studentPRN,
      studentName,
      studentEmail,
      results: {}
    });

    res.status(200).json({ message: "✅ Student added successfully" });
  } catch (err) {
    console.error("❌ Error adding student:", err);
    res.status(500).json({ message: "Failed to add student", error: err.message });
  }
});

// =====================================
// 📊 Add Multiple Students via Excel
// =====================================
app.post('/add-multiple-students', upload.single('excel'), async (req, res) => {
  if (!req.file) return res.status(400).json({ message: "Excel file not uploaded" });

  try {
    const workbook = xlsx.readFile(req.file.path);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const students = xlsx.utils.sheet_to_json(sheet);

    const promises = students.map(async (row) => {
      const { studentPRN, studentName, studentEmail } = row;
      if (studentPRN && studentName && studentEmail) {
        const docRef = doc(db, "students", String(studentPRN));
        const snap = await getDoc(docRef);
        if (!snap.exists()) {
          await setDoc(docRef, {
            studentPRN: String(studentPRN),
            studentName,
            studentEmail,
            results: {}
          });
        }
      }
    });

    await Promise.all(promises);
    await fs.promises.unlink(req.file.path);
    res.status(200).json({ message: "✅ Students added successfully" });
  } catch (err) {
    console.error("❌ Excel processing error:", err);
    res.status(500).json({ message: "Error processing Excel", error: err.message });
  }
});

// =====================================
// 🧾 Upload Result PDF for Student
// =====================================
app.post('/upload-results', upload.single('certificate'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

    const filename = req.file.originalname.split('.')[0]; // e.g., 1234567890_Sem1
    const [studentPRN, semesterRaw] = filename.split('_');
    const semester = semesterRaw.trim();

    const buffer = fs.readFileSync(req.file.path);
    const certHash = crypto.createHash('sha256').update(buffer).digest('hex');

    const studentRef = doc(db, "students", studentPRN);
    const snapshot = await getDoc(studentRef);
    if (!snapshot.exists()) {
      return res.status(404).json({ message: "Student not found" });
    }

    const studentData = snapshot.data();

    // ☁️ Upload to Google Drive
    const fileUrl = await uploadToDrive(req.file);

    // 🔗 Record to Blockchain
    const tx = await contract.recordCertificate(studentPRN, studentData.studentName, certHash);
    await tx.wait();

    const updatedResults = {
      ...studentData.results,
      [semester]: {
        fileUrl,
        certHash,
        issued: true,
        uploadedAt: new Date().toISOString()
      }
    };
    await setDoc(studentRef, { ...studentData, results: updatedResults });

    await sendCertificateEmail(
      "vinaykamble289@gmail.com",
      studentData.studentName,
      fileUrl,
      certHash
    );

    await fs.promises.unlink(req.file.path);

    res.status(200).json({
      message: "✅ Result uploaded and linked successfully",
      studentPRN,
      semester,
      fileUrl,
      certHash
    });
  } catch (err) {
    console.error("❌ Result upload error:", err);
    res.status(500).json({ message: "Failed to process result", error: err.message });
  }
});




// Ask Gemini
app.post('/api/ask', async (req, res) => {
  const { prompt } = req.body;
  try {
    const result = await model.generateContent(prompt);
    const text = await result.response.text();
    res.json({ answer: text });
  } catch (error) {
    console.error('Gemini error:', error);
    res.status(500).json({ error: 'Gemini API failed' });
  }
});

// Upload Certificate
app.post('/upload-certificate', upload.single('certificate'), async (req, res) => {
  try {
    const { studentName, studentPRN, studentEmail, certificateName, issueDate, semester } = req.body;
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

    const fileBuffer = await fs.promises.readFile(req.file.path);
    const certHash = crypto.createHash('sha256').update(fileBuffer).digest('hex');
    const fileUrl = await uploadToDrive(req.file);
    const tx = await contract.recordCertificate(studentPRN, studentName, certHash);
    await tx.wait();

    await setDoc(doc(db, "students", studentPRN), {
      studentName,
      studentPRN,
      studentEmail,
      certificateName,
      issueDate,
      semester,
      fileUrl,
      certHash,
      issued: true,
      verified: false
    });

    await sendCertificateEmail(studentEmail, studentName, fileUrl, certHash);
    await fs.promises.unlink(req.file.path);

    res.status(200).json({
      message: '✅ Certificate uploaded and recorded',
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

// // Verify Certificate
// app.post('/verify-certificate', upload.single('certificate'), async (req, res) => {
//   try {
//     const { studentPRN } = req.body;
//     if (!req.file || !studentPRN) return res.status(400).json({ message: 'Missing data' });

//     const fileBuffer = await fs.promises.readFile(req.file.path);
//     const uploadedHash = crypto.createHash('sha256').update(fileBuffer).digest('hex');
//     const snap = await getDoc(doc(db, "students", studentPRN));
//     if (!snap.exists()) return res.status(404).json({ message: "Student not found" });

//     const firebaseData = snap.data();
//     const firebaseMatch = uploadedHash === firebaseData.certHash;
//     const verified = firebaseMatch;

//     if (!verified) {
//       return res.status(400).json({
//         message: "❌ Certificate file is tampered",
//         uploadedHash,
//         firebaseHash: firebaseData.certHash,
//         verified
//       });
//     }

//     await setDoc(doc(db, "students", studentPRN), {
//       ...firebaseData,
//       verified: true
//     });

//     res.status(200).json({
//       message: "✅ Certificate is authentic",
//       student: firebaseData,
//       uploadedHash,
//       firebaseHash: firebaseData.certHash,
//       verified
//     });
//   } catch (err) {
//     console.error("❌ Verification error:", err);
//     res.status(500).json({ message: 'Verification failed', error: err.message });
//   } finally {
//     if (req.file) await fs.promises.unlink(req.file.path);
//   }
// });

app.post('/verify-certificate', upload.single('certificate'), async (req, res) => {
  try {
    const buffer = fs.readFileSync(req.file.path);
    const uploadedHash = crypto.createHash('sha256').update(buffer).digest('hex');

    const studentsRef = collection(db, 'students');
    const snapshot = await getDocs(studentsRef);
    let match = null;

    snapshot.forEach(docSnap => {
      const student = docSnap.data();
      const prn = docSnap.id;

      if (student.results) {
        for (const semester in student.results) {
          const cert = student.results[semester];
          if (cert.certHash === uploadedHash) {
            match = {
              prn,
              semester,
              studentName: student.studentName,
              email: student.email,
              fileUrl: cert.fileUrl,
              verifiedAt: new Date().toISOString()
            };
            break;
          }
        }
      }
    });

    await fs.promises.unlink(req.file.path); // delete uploaded file after verification

    if (match) {
      res.status(200).send({
        message: '✅ Certificate is valid and untampered.',
        student: match
      });
    } else {
      res.status(404).send({ message: '❌ Certificate is not valid or not found.' });
    }

  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Verification failed due to an internal error.', error: error.message });
  }
});

// Get All Students
app.get('/students', async (req, res) => {
  try {
    const snapshot = await getDocs(collection(db, "students"));

    const certificates = [];

    snapshot.forEach(doc => {
      const student = doc.data();
      // console.log('Student Data:', student);  // Log the student data to verify structure

      const studentName = student.studentName || "Unknown";
      const studentEmail = student.studentEmail || "Not Provided";
      const studentPRN = student.studentPRN;

      // Process certificates directly stored on the student document
      if (student.certHash && student.certificateName) {
        certificates.push({
          studentName,
          studentPRN,
          semester: student.semester || "Unknown",
          studentEmail,
          fileUrl: student.fileUrl || "#",
          certHash: student.certHash || "N/A",
          issueDate: student.issueDate || "Unknown"
        });
      }

      // Process certificates stored under 'results'
      if (student.results) {
        Object.keys(student.results).forEach(semester => {
          const cert = student.results[semester];
          certificates.push({
            studentName,
            studentPRN,
            semester,
            studentEmail,
            fileUrl: cert.fileUrl || "#",
            certHash: cert.certHash || "N/A",
            issueDate: cert.uploadedAt || "Unknown"
          });
        });
      }
    });

    console.log('Certificates:', certificates);  // Log the certificates array to verify data
    res.status(200).json({
      message: '✅ Certificates fetched successfully',
      students: certificates
    });
  } catch (err) {
    console.error("❌ Fetch students error:", err);
    res.status(500).json({ message: 'Failed to fetch students', error: err.message });
  }
});

// GET /students/:prn
// GET /students/:prn
app.get('/students/:prn', async (req, res) => {
  const { prn } = req.params;

  try {
    const snapshot = await getDocs(collection(db, "students"));
    const certificates = [];

    snapshot.forEach(doc => {
      const student = doc.data();

      if (student.studentPRN === prn) {
        const studentName = student.studentName || "Unknown";
        const studentEmail = student.studentEmail || "Not Provided";

        // Process certificates directly stored on the student document
        if (student.certHash && student.certificateName) {
          certificates.push({
            studentName,
            studentPRN: student.studentPRN,
            semester: student.semester || "Unknown",
            studentEmail,
            fileUrl: student.fileUrl || "#",
            certHash: student.certHash || "N/A",
            issueDate: student.issueDate || "Unknown"
          });
        }

        // Process certificates stored under 'results'
        if (student.results) {
          Object.keys(student.results).forEach(semester => {
            const cert = student.results[semester];
            certificates.push({
              studentName,
              studentPRN: student.studentPRN,
              semester,
              studentEmail,
              fileUrl: cert.fileUrl || "#",
              certHash: cert.certHash || "N/A",
              issueDate: cert.uploadedAt || "Unknown"
            });
          });
        }
      }
    });

    if (certificates.length === 0) {
      return res.status(404).json({ message: 'No certificates found for this PRN.' });
    }

    res.status(200).json({ message: '✅ Certificates fetched successfully', certificates });
  } catch (err) {
    console.error("❌ Fetch student certificates error:", err);
    res.status(500).json({ message: 'Failed to fetch student certificates', error: err.message });
  }
});

// Filtered Routes
const fetchFiltered = async (res, key, value) => {
  try {
    const snapshot = await getDocs(collection(db, "students"));
    const filtered = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      .filter(doc => doc[key] === value);
    res.status(200).json(filtered);
  } catch (err) {
    res.status(500).json({ message: 'Fetch failed', error: err.message });
  }
};

app.get('/certificates/verified', (_, res) => fetchFiltered(res, 'verified', true));
app.get('/certificates/unverified', (_, res) => fetchFiltered(res, 'verified', false));
app.get('/certificates/issued', (_, res) => fetchFiltered(res, 'issued', true));
app.get('/certificates/not-issued', (_, res) => fetchFiltered(res, 'issued', false));

// Start Server
app.listen(process.env.PORT || 5000, async () => {
  // const testRef = doc(db, "test", "ping");
  // await setDoc(testRef, { ping: "pong" });
  // console.log("✅ Firebase connected");
  // await transporter.sendMail(mailOptions)
  // .then(info => console.log("📩 Mail sent:", info.messageId))
  // .catch(err => console.error("❌ Mail Error:", err));
  // console.log("Connected Wallet:", wallet.address);


  console.log(`🚀 Server running on port ${process.env.PORT || 5000}`);
});








// import express from 'express';
// import cors from 'cors';
// import multer from 'multer';
// import fs from 'fs';
// import dotenv from 'dotenv';
// import crypto from 'crypto';
// import { google } from 'googleapis';
// import { JsonRpcProvider, ethers } from 'ethers';
// import path, { dirname } from 'path';
// import { fileURLToPath } from 'url';
// // server.js or in a /api/ask route
// import bodyParser from 'body-parser';
// import axios from 'axios';
// import nodemailer from 'nodemailer';
// import TrustChainABI from './TrustChainABI.json' assert { type: 'json' };
// import serviceAccount from './gdrive-service.json' assert { type: 'json' };

// import { GoogleGenerativeAI } from '@google/generative-ai';

// // Firebase Setup
// import { initializeApp } from 'firebase/app';
// import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';

// dotenv.config();

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// const firebaseConfig = {
//   apiKey: "AIzaSyDbwflWkbJ_98ZDEZ97mpWOyIDs6RFT-lk",
//   authDomain: "student-dd35b.firebaseapp.com",
//   projectId: "student-dd35b",
//   storageBucket: "student-dd35b.firebasestorage.app",
//   messagingSenderId: "72941404312",
//   appId: "1:72941404312:web:5f4e3da23958cacc1b10ed",
//   measurementId: "G-NP7672Z0T3",
// };

// const firebaseApp = initializeApp(firebaseConfig);
// const db = getFirestore(firebaseApp);

// // Blockchain Setup
// const provider = new JsonRpcProvider("http://127.0.0.1:8545");
// const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
// const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, TrustChainABI.abi, wallet);

// // Google Drive
// const auth = new google.auth.GoogleAuth({
//   credentials: serviceAccount,
//   scopes: ['https://www.googleapis.com/auth/drive'],
// });
// const drive = google.drive({ version: 'v3', auth });

// // Express
// const app = express();
// app.use(cors());
// app.use(express.json());
// const upload = multer({ dest: 'uploads/' });

// // Helper: Upload to Google Drive
// const uploadToDrive = async (file) => {
//   const fileMetadata = {
//     name: `${Date.now()}_${file.originalname}`,
//     parents: [process.env.GDRIVE_FOLDER_ID],
//   };
//   const media = {
//     mimeType: file.mimetype,
//     body: fs.createReadStream(file.path),
//   };

//   const response = await drive.files.create({
//     resource: fileMetadata,
//     media,
//     fields: 'id',
//   });

//   return `https://drive.google.com/uc?id=${response.data.id}&export=download`;
// };

// //gmail

// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'vinaykamble289@gmail.com',              // Your Gmail address
//     pass: 'etvpuacywvirspsu'   // 16-char app password (no spaces)
//   }
// });


// const sendCertificateEmail = async (to, name, certUrl, certHash) => {
//   const mailOptions = {
//     from: process.env.EMAIL_USER,
//     to,
//     subject: '🎓 Your Certificate is Live on Blockchain!',
//     html: `
//       <h2>Hello ${name},</h2>
//       <p>Congratulations! Your certificate has been successfully uploaded and recorded on the blockchain.</p>
//       <p><strong>Download Link:</strong> <a href="${certUrl}">Click here to view your certificate</a></p>
//       <p><strong>Certificate Hash:</strong> ${certHash}</p>
//       <p>Use this hash to verify the authenticity of your certificate at any time.</p>
//       <br>
//       <p>Best regards,<br>TrustChain Team</p>
//     `
//   };

//   await transporter.sendMail(mailOptions);
// };


// //const ai = new GoogleGenAI({ apiKey:"AIzaSyBUWSedwDXFSHAALILUD0B0Jzyhm_MI3YM"});

// // Initialize Gemini API
// // Initialize Gemini
// const genAI = new GoogleGenerativeAI("AIzaSyBUWSedwDXFSHAALILUD0B0Jzyhm_MI3YM");
// const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

// app.post('/api/ask', async (req, res) => {
//   const { prompt } = req.body;

//   try {
//     const result = await model.generateContent(prompt);
//     const response = await result.response;
//     const text = response.text();

//     res.json({ answer: text });
//   } catch (error) {
//     console.error('Gemini error:', error);
//     res.status(500).json({ error: 'Failed to get response from Gemini API.' });
//   }
// });



// // 🟢 Upload Route
// app.post('/upload-certificate', upload.single('certificate'), async (req, res) => {
//   try {
//     const { studentName, studentPRN, studentEmail, certificateName, issueDate, semester } = req.body;
//     if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

//     // 🔐 Generate hash of the file (SHA-256)
//     const fileBuffer = await fs.promises.readFile(req.file.path);
//     const certHash = crypto.createHash('sha256').update(fileBuffer).digest('hex');

    // // ☁️ Upload to Google Drive
    // const fileUrl = await uploadToDrive(req.file);

    // // 🔗 Record to Blockchain
    // const tx = await contract.recordCertificate(studentPRN, studentName, certHash);
    // await tx.wait();

//     // 🔥 Save to Firebase
//     await setDoc(doc(db, "students", studentPRN), {
//       studentName,
//       studentPRN,
//       studentEmail,
//       certificateName,
//       issueDate,
//       semester,
//       fileUrl,
//       certHash
//     });
//     // 📧 Send Email
//     await sendCertificateEmail(studentEmail, studentName, fileUrl, certHash);
//     await fs.promises.unlink(req.file.path); // Cleanup temp file

//     res.status(200).json({
//       message: '✅ Certificate uploaded and recorded successfully',
//       txHash: tx.hash,
//       fileUrl,
//       certHash
//     });

//   } catch (err) {
//     if (req.file) await fs.promises.unlink(req.file.path);
//     console.error("❌ Upload error:", err);
//     res.status(500).json({ message: 'Upload failed', error: err.message });
//   }
// });


// app.post('/verify-certificate', upload.single('certificate'), async (req, res) => {
//   try {
//     const { studentPRN } = req.body;

//     if (!req.file || !studentPRN) {
//       return res.status(400).json({ message: 'Missing file or PRN' });
//     }

//     // 1. Generate hash of uploaded file
//     const fileBuffer = await fs.promises.readFile(req.file.path);
//     const uploadedHash = crypto.createHash('sha256').update(fileBuffer).digest('hex');

//     // 2. Fetch from Firebase
//     const snap = await getDoc(doc(db, "students", studentPRN));
//     if (!snap.exists()) {
//       await fs.promises.unlink(req.file.path);
//       return res.status(404).json({ message: "❌ Student not found in Firebase" });
//     }
//     const firebaseData = snap.data();

//     // // 3. Fetch from Blockchain
//     // let blockchainCert;
//     // try {
//     //   blockchainCert = await contract.getCertificate(studentPRN);
//     // } catch (err) {
//     //   await fs.promises.unlink(req.file.path);
//     //   return res.status(404).json({ message: "❌ Certificate not found on blockchain" });
//     // }

//     // await fs.promises.unlink(req.file.path); // delete file after use

//     // 4. Compare hashes
//     const firebaseMatch = uploadedHash === firebaseData.certHash;
//     // const blockchainMatch = uploadedHash === blockchainCert.certificateHash;

//     if (!firebaseMatch || false/*!blockchainMatch*/) {
//       return res.status(400).json({
//         message: "❌ Certificate file is tampered",
//         uploadedHash,
//         firebaseHash: firebaseData.certHash,
//         // blockchainHash: blockchainCert.certificateHash,
//         firebaseMatch,
//         // blockchainMatch
//       });
//     }

//     // 5. Verified
//     return res.status(200).json({
//       message: "✅ Certificate is authentic",
//       student: firebaseData,
//       uploadedHash,
//       firebaseHash: firebaseData.certHash,
//       blockchainHash: firebaseData.certHash,
//       // timestamp: blockchainCert.timestamp
//     });

//   } catch (err) {
//     console.error("❌ Verification error:", err);
//     res.status(500).json({ message: 'Server error during verification', error: err.message });
//   }
// });

// import { collection, getDocs } from 'firebase/firestore';

// app.get('/students', async (req, res) => {
//   try {
//     const snapshot = await getDocs(collection(db, "students"));
//     const students = snapshot.docs.map(doc => ({
//       id: doc.id,
//       ...doc.data()
//     }));

//     res.status(200).json({
//       message: '✅ All students fetched successfully',
//       students
//     });
//   } catch (err) {
//     console.error("❌ Fetch students error:", err);
//     res.status(500).json({ message: 'Failed to fetch students', error: err.message });
//   }
// });


// app.get('/verify/:studentPRN', async (req, res) => {
//   try {
//     const { studentPRN } = req.params;
//     const snap = await getDoc(doc(db, "students", studentPRN));
//     if (!snap.exists()) return res.status(404).json({ message: "Student not found" });
//     const data = snap.data();
//     res.status(200).json(data);
//   } catch (err) {
//     console.error("❌ Fetch error:", err);
//     res.status(500).json({ message: 'Fetch failed', error: err.message });
//   }
// });
// app.get('/certificates', async (req, res) => {
//   try {
//     const snapshot = await getDocs(collection(db, "students"));
//     const certificates = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//     res.status(200).json(certificates);
//   } catch (err) {
//     console.error("❌ Fetch error:", err);
//     res.status(500).json({ message: 'Fetch failed', error: err.message });
//   }
// });
// app.get('/certificates/:studentPRN', async (req, res) => {
//   try {
//     const { studentPRN } = req.params;
//     const snap = await getDoc(doc(db, "students", studentPRN));
//     if (!snap.exists()) return res.status(404).json({ message: "Student not found" });
//     const data = snap.data();
//     res.status(200).json(data);
//   } catch (err) {
//     console.error("❌ Fetch error:", err);
//     res.status(500).json({ message: 'Fetch failed', error: err.message });
//   }
// });
// app.get('/certificates/verified', async (req, res) => {
//   try {
//     const snapshot = await getDocs(collection(db, "students"));
//     const verifiedCertificates = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
//       .filter(cert => cert.verified === true);
//     res.status(200).json(verifiedCertificates);
//   } catch (err) {
//     console.error("❌ Fetch error:", err);
//     res.status(500).json({ message: 'Fetch failed', error: err.message });
//   }
// });
// app.get('/certificates/unverified', async (req, res) => {
//   try {
//     const snapshot = await getDocs(collection(db, "students"));
//     const unverifiedCertificates = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
//       .filter(cert => cert.verified === false);
//     res.status(200).json(unverifiedCertificates);
//   } catch (err) {
//     console.error("❌ Fetch error:", err);
//     res.status(500).json({ message: 'Fetch failed', error: err.message });
//   }
// });
// app.get('/certificates/issued', async (req, res) => {
//   try {
//     const snapshot = await getDocs(collection(db, "students"));
//     const issuedCertificates = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
//       .filter(cert => cert.issued === true);
//     res.status(200).json(issuedCertificates);
//   } catch (err) {
//     console.error("❌ Fetch error:", err);
//     res.status(500).json({ message: 'Fetch failed', error: err.message });
//   }
// });
// app.get('/certificates/not-issued', async (req, res) => {
//   try {
//     const snapshot = await getDocs(collection(db, "students"));
//     const notIssuedCertificates = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
//       .filter(cert => cert.issued === false);
//     res.status(200).json(notIssuedCertificates);
//   } catch (err) {
//     console.error("❌ Fetch error:", err);
//     res.status(500).json({ message: 'Fetch failed', error: err.message });
//   }
// });
// app.get('/certificates/:studentPRN', async (req, res) => {
//   try {
//     const { studentPRN } = req.params;
//     const snap = await getDoc(doc(db, "students", studentPRN));
//     if (!snap.exists()) return res.status(404).json({ message: "Student not found" });
//     const data = snap.data();
//     res.status(200).json(data);
//   } catch (err) {
//     console.error("❌ Fetch error:", err);
//     res.status(500).json({ message: 'Fetch failed', error: err.message });
//   }
// });
// app.listen(process.env.PORT || 5000, () => {
//   console.log(`Server running on port ${process.env.PORT || 5000}`);
// });