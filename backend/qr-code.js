import express from 'express';
import cors from 'cors';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';
import QRCode from 'qrcode';
import { google } from 'googleapis';
import PDFDocument from 'pdfkit';
import axios from 'axios';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Setup router
const router = express.Router();

// Configure Google Drive
const auth = new google.auth.GoogleAuth({
  credentials: JSON.parse(process.env.GDRIVE_SERVICE_ACCOUNT || '{}'),
  scopes: ['https://www.googleapis.com/auth/drive'],
});

const drive = google.drive({ version: 'v3', auth });

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// Helper: Upload to Google Drive
const uploadToDrive = async (filePath, fileName, mimeType) => {
  try {
    const fileMetadata = {
      name: fileName,
      parents: [process.env.GDRIVE_FOLDER_ID],
    };
    
    const media = {
      mimeType: mimeType,
      body: fs.createReadStream(filePath),
    };

    const response = await drive.files.create({
      resource: fileMetadata,
      media,
      fields: 'id,webViewLink',
    });

    // Make the file accessible to anyone with the link
    await drive.permissions.create({
      fileId: response.data.id,
      requestBody: {
        role: 'reader',
        type: 'anyone',
      },
    });

    return {
      fileId: response.data.id,
      webViewLink: response.data.webViewLink,
      downloadLink: `https://drive.google.com/uc?id=${response.data.id}&export=download`
    };
  } catch (error) {
    console.error('Error uploading to Google Drive:', error);
    throw new Error('Failed to upload file to Google Drive');
  }
};

// Helper: Create Certificate PDF
const generateCertificatePDF = async (studentData) => {
  return new Promise((resolve, reject) => {
    try {
      const filePath = path.join(__dirname, 'uploads', `certificate-${studentData.studentPRN}-${Date.now()}.pdf`);
      const doc = new PDFDocument({ size: 'A4', margin: 50 });
      
      // Create a write stream for the PDF
      const stream = fs.createWriteStream(filePath);
      doc.pipe(stream);
      
      // Add certificate content
      doc.font('Helvetica-Bold')
         .fontSize(24)
         .text('CERTIFICATE OF ACHIEVEMENT', { align: 'center' });
      
      doc.moveDown();
      doc.image(path.join(__dirname, 'assets', 'logo.png'), {
        fit: [100, 100],
        align: 'center'
      });
      
      doc.moveDown();
      doc.font('Helvetica')
         .fontSize(12)
         .text('This is to certify that', { align: 'center' });
      
      doc.moveDown();
      doc.font('Helvetica-Bold')
         .fontSize(20)
         .text(studentData.studentName, { align: 'center' });
      
      doc.moveDown();
      doc.font('Helvetica')
         .fontSize(12)
         .text(`PRN: ${studentData.studentPRN}`, { align: 'center' });
      
      doc.moveDown();
      doc.text(`has successfully completed ${studentData.certificateName}`, { align: 'center' });
      
      doc.moveDown();
      doc.text(`Semester: ${studentData.semester || 'N/A'}`, { align: 'center' });
      
      doc.moveDown();
      doc.text(`Issue Date: ${studentData.issueDate || new Date().toLocaleDateString()}`, { align: 'center' });
      
      doc.moveDown(2);
      doc.font('Helvetica-Bold')
         .fontSize(10)
         .text('Certificate Hash:', { align: 'center' });
      
      doc.moveDown();
      doc.font('Helvetica')
         .fontSize(10)
         .text(studentData.certHash || '(Not yet registered on blockchain)', { align: 'center' });
      
      // Add QR code at the bottom
      const qrCodeDataUrl = async QRCode.toDataURL(
        `${process.env.FRONTEND_URL || 'http://localhost:3000'}/verify/${studentData.studentPRN}`
      );
      
      doc.moveDown(2);
      doc.image(qrCodeDataUrl, {
        fit: [150, 150],
        align: 'center'
      });
      
      doc.moveDown();
      doc.fontSize(10)
         .text('Scan to verify certificate authenticity', { align: 'center' });
      
      // Finalize the PDF
      doc.end();
      
      stream.on('finish', () => {
        resolve(filePath);
      });
      
      stream.on('error', (err) => {
        reject(err);
      });
      
    } catch (err) {
      reject(err);
    }
  });
};

// Route 1: Generate QR code
router.get('/generate-qr', async (req, res) => {
  const { url } = req.query;
  
  if (!url) {
    return res.status(400).json({ 
      success: false,
      message: 'URL parameter is required' 
    });
  }

  try {
    // Generate QR code
    const qrCodeImage = await QRCode.toDataURL(url, {
      errorCorrectionLevel: 'H',
      margin: 1,
      color: {
        dark: '#5D3FD3',  // Purple color for QR code
        light: '#FFFFFF'  // White background
      }
    });

    // Send the QR code as a response
    res.status(200).json({ 
      success: true,
      qrCodeImage 
    });
  } catch (err) {
    console.error("❌ QR code generation error:", err);
    res.status(500).json({ 
      success: false,
      message: 'Error generating QR code',
      error: err.message
    });
  }
});

// Route 2: Generate and upload certificate report
router.post('/generate-certificate', async (req, res) => {
  try {
    const { studentPRN } = req.body;
    
    if (!studentPRN) {
      return res.status(400).json({
        success: false,
        message: 'Student PRN is required'
      });
    }

    // Fetch student data from Firebase (using your existing code)
    const studentRef = doc(db, "students", studentPRN);
    const studentSnap = await getDoc(studentRef);
    
    if (!studentSnap.exists()) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }
    
    const studentData = studentSnap.data();
    
    // Generate certificate PDF
    const pdfPath = await generateCertificatePDF(studentData);
    
    // Upload PDF to Google Drive
    const driveResponse = await uploadToDrive(
      pdfPath,
      `Certificate_${studentData.studentName}_${studentData.studentPRN}.pdf`,
      'application/pdf'
    );
    
    // Update student record with certificate link
    await setDoc(studentRef, {
      ...studentData,
      certificateUrl: driveResponse.downloadLink,
      certificateId: driveResponse.fileId,
      certificateGenerated: true,
      certificateGeneratedAt: new Date().toISOString()
    }, { merge: true });
    
    // Generate verification QR code
    const verificationUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/verify/${studentPRN}`;
    const qrCodeImage = await QRCode.toDataURL(verificationUrl, {
      errorCorrectionLevel: 'H',
      margin: 1,
      color: {
        dark: '#5D3FD3',
        light: '#FFFFFF'
      }
    });
    
    // Clean up temporary file
    fs.unlinkSync(pdfPath);
    
    res.status(200).json({
      success: true,
      message: 'Certificate generated and uploaded successfully',
      certificateUrl: driveResponse.downloadLink,
      certificateViewLink: driveResponse.webViewLink,
      qrCodeImage,
      studentData: {
        name: studentData.studentName,
        prn: studentData.studentPRN,
        email: studentData.studentEmail,
        certificateName: studentData.certificateName
      }
    });
    
  } catch (err) {
    console.error("❌ Certificate generation error:", err);
    res.status(500).json({
      success: false,
      message: 'Failed to generate certificate',
      error: err.message
    });
  }
});

// Route 3: Verify certificate and generate verification report
router.post('/verify-with-report', upload.single('certificate'), async (req, res) => {
  try {
    const { studentPRN } = req.body;
    let fileHash;
    
    if (!studentPRN) {
      return res.status(400).json({
        success: false,
        message: 'Student PRN is required'
      });
    }
    
    // If a file was uploaded, calculate its hash
    if (req.file) {
      const fileBuffer = await fs.promises.readFile(req.file.path);
      fileHash = crypto.createHash('sha256').update(fileBuffer).digest('hex');
    }
    
    // Fetch student data from database
    const studentRef = doc(db, "students", studentPRN);
    const studentSnap = await getDoc(studentRef);
    
    if (!studentSnap.exists()) {
      return res.status(404).json({
        success: false,
        message: 'Student record not found'
      });
    }
    
    const studentData = studentSnap.data();
    
    // Verify certificate hash if file was uploaded
    let hashVerified = false;
    let chainVerified = false;
    
    if (fileHash && studentData.certHash) {
      hashVerified = fileHash === studentData.certHash;
    }
    
    // Simulate blockchain verification (replace with actual blockchain call)
    try {
      // This would normally call your blockchain method
      // const blockchainCert = await contract.getCertificate(studentPRN);
      // chainVerified = blockchainCert && blockchainCert.certificateHash === studentData.certHash;
      chainVerified = true; // Placeholder for actual blockchain verification
    } catch (err) {
      console.error('Blockchain verification error:', err);
    }
    
    // Generate verification report
    const reportPath = path.join(__dirname, 'uploads', `verification-${studentPRN}-${Date.now()}.pdf`);
    const doc = new PDFDocument({ size: 'A4', margin: 50 });
    const stream = fs.createWriteStream(reportPath);
    
    doc.pipe(stream);
    
    // Add report content
    doc.fontSize(24)
       .text('Certificate Verification Report', { align: 'center' });
    
    doc.moveDown();
    doc.fontSize(12)
       .text(`Verification Date: ${new Date().toLocaleDateString()}`, { align: 'right' });
    
    doc.moveDown(2);
    doc.fontSize(16)
       .text('Student Information:', { underline: true });
    
    doc.moveDown();
    doc.fontSize(12)
       .text(`Name: ${studentData.studentName}`)
       .text(`PRN: ${studentData.studentPRN}`)
       .text(`Certificate: ${studentData.certificateName}`)
       .text(`Issue Date: ${studentData.issueDate || 'N/A'}`);
    
    doc.moveDown(2);
    doc.fontSize(16)
       .text('Verification Results:', { underline: true });
    
    doc.moveDown();
    doc.fontSize(12)
       .text(`Certificate Hash: ${studentData.certHash || 'N/A'}`)
       .text(`Hash Verification: ${hashVerified ? '✅ Verified' : fileHash ? '❌ Failed' : '⚠️ Not Performed'}`)
       .text(`Blockchain Verification: ${chainVerified ? '✅ Verified' : '⚠️ Not Performed'}`);
    
    doc.moveDown(2);
    doc.fontSize(16)
       .text('Verification Status:', { underline: true });
    
    doc.moveDown();
    if (hashVerified && chainVerified) {
      doc.fontSize(14)
         .fillColor('green')
         .text('✅ CERTIFICATE VERIFIED', { align: 'center' });
    } else if (hashVerified) {
      doc.fontSize(14)
         .fillColor('orange')
         .text('⚠️ PARTIALLY VERIFIED', { align: 'center' });
    } else {
      doc.fontSize(14)
         .fillColor('red')
         .text('❌ VERIFICATION FAILED', { align: 'center' });
    }
    
    doc.moveDown(2);
    doc.fillColor('black')
       .fontSize(10)
       .text('This is an automatically generated report from the TrustChain Certificate Verification System.', { align: 'center' });
    
    doc.end();
    
    // Wait for the file to be fully written
    await new Promise((resolve) => {
      stream.on('finish', resolve);
    });
    
    // Upload verification report to Google Drive
    const driveResponse = await uploadToDrive(
      reportPath,
      `Verification_${studentData.studentName}_${studentPRN}.pdf`,
      'application/pdf'
    );
    
    // Generate QR code for the verification report
    const reportQrCode = await QRCode.toDataURL(driveResponse.downloadLink);
    
    // Clean up temporary file
    fs.unlinkSync(reportPath);
    if (req.file) fs.unlinkSync(req.file.path);
    
    // Log this verification
    await setDoc(doc(db, "verifications", `${studentPRN}-${Date.now()}`), {
      studentPRN,
      studentName: studentData.studentName,
      verificationDate: new Date().toISOString(),
      hashVerified,
      chainVerified,
      reportUrl: driveResponse.downloadLink,
      verifiedBy: req.body.verifierEmail || 'Unknown',
      ipAddress: req.ip
    });
    
    res.status(200).json({
      success: true,
      message: 'Certificate verification completed',
      verified: hashVerified && chainVerified,
      hashVerified,
      chainVerified,
      studentData: {
        name: studentData.studentName,
        prn: studentData.studentPRN,
        certificateName: studentData.certificateName,
        issueDate: studentData.issueDate
      },
      reportUrl: driveResponse.downloadLink,
      reportViewLink: driveResponse.webViewLink,
      qrCodeImage: reportQrCode
    });
    
  } catch (err) {
    console.error("❌ Verification error:", err);
    res.status(500).json({
      success: false,
      message: 'Verification process failed',
      error: err.message
    });
  }
});

// Route 4: Get student certificate with QR code
router.get('/student-certificate-qr/:studentPRN', async (req, res) => {
  try {
    const { studentPRN } = req.params;
    
    // Fetch student data
    const studentRef = doc(db, "students", studentPRN);
    const studentSnap = await getDoc(studentRef);
    
    if (!studentSnap.exists()) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }
    
    const studentData = studentSnap.data();
    
    // Generate QR code for verification
    const verificationUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/verify/${studentPRN}`;
    const qrCodeImage = await QRCode.toDataURL(verificationUrl, {
      errorCorrectionLevel: 'H',
      margin: 1,
      color: {
        dark: '#5D3FD3',
        light: '#FFFFFF'
      }
    });
    
    res.status(200).json({
      success: true,
      studentData: {
        name: studentData.studentName,
        prn: studentData.studentPRN,
        email: studentData.studentEmail,
        certificateName: studentData.certificateName,
        issueDate: studentData.issueDate,
        semester: studentData.semester,
        certificateUrl: studentData.fileUrl || studentData.certificateUrl
      },
      qrCodeImage
    });
    
  } catch (err) {
    console.error("❌ Error fetching student certificate:", err);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve certificate information',
      error: err.message
    });
  }
});
