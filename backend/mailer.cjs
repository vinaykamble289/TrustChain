require('dotenv').config(); // Make sure this is at the top

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail', // or use host/port for custom SMTP
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

async function sendEmail(to, filePath) {
  await transporter.sendMail({
    from: process.env.EMAIL_ID,
    to,
    subject: 'Your Certificate',
    text: 'Please find your certificate attached.',
    attachments: [{ path: filePath }],
  });
}

module.exports = { sendEmail };
