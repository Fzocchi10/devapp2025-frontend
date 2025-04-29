import axios from 'axios';

const baseURL = "devapp2025-backend-production.up.railway.app/";

const apiClient = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;