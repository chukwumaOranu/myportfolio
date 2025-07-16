import axios from 'axios';
import { getAuthToken } from '@/utils/auth';

// Create axios instance with default config
const api = axios.create({
  baseURL: process.env.NODE_ENV === 'development' 
    ? 'http://localhost:5000' 
    : 'https://api.chukwumaoranu.co.uk',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // VERY IMPORTANT: send HttpOnly cookies
  timeout: 30000, // 30 seconds timeout for mobile networks
});

// Request interceptor to add Authorization header
api.interceptors.request.use(
  (config) => {
    // Get token using utility function
    if (typeof window !== 'undefined') {
      const token = getAuthToken();
      
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
