import axios from 'axios';

const baseURL = "https://devapp2025-backend-franco-zocchi.up.railway.app";

const apiClient = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;