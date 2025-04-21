const { google } = require('googleapis');
const fs = require('fs');

const auth = new google.auth.GoogleAuth({
  keyFile: 'serviceAccountKey.json',
  scopes: ['https://www.googleapis.com/auth/drive.file'],
});
const drive = google.drive({ version: 'v3', auth });

async function uploadToDrive(filePath, filename) {
  const fileMetadata = { name: filename };
  const media = { mimeType: 'application/pdf', body: fs.createReadStream(filePath) };
  const response = await drive.files.create({ resource: fileMetadata, media, fields: 'id' });
  return response.data.id;
}

module.exports = { uploadToDrive };
