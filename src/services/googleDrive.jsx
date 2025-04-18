
// FILE: src/services/googleDrive.js
import axios from 'axios';

// This service would need to interact with backend to handle OAuth
export const uploadToDrive = async (file, metadata) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('metadata', JSON.stringify(metadata));
  
  try {
    const response = await axios.post('/api/drive/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  } catch (error) {
    console.error('Error uploading to Google Drive:', error);
    throw error;
  }
};

export const getFileFromDrive = async (fileId) => {
  try {
    const response = await axios.get(`/api/drive/file/${fileId}`, {
      responseType: 'blob'
    });
    return response.data;
  } catch (error) {
    console.error('Error getting file from Google Drive:', error);
    throw error;
  }
};
