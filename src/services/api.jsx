// FILE: src/services/api.js
import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';

const api = axios.create({
  baseURL: API_BASE_URL
});

export const registerUser = async (userData) => {
  return api.post('/users/register', userData);
};

export const uploadCertificateMetadata = async (certificateData) => {
  return api.post('/certificates/upload', certificateData);
};

export const getCertificatesForUser = async (userId) => {
  return api.get(`/certificates/user/${userId}`);
};

export const verifyCertificateAPI = async (certificateHash) => {
  return api.get(`/certificates/verify/${certificateHash}`);
};