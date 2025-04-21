const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_ID,
    pass: process.env.EMAIL_ID,
  },
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

