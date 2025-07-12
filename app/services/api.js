import axios from 'axios';

// Create axios instance with default config
const api = axios.create({
  baseURL: process.env.NODE_ENV === 'development' 
    ? 'http://localhost:5000' 
    : 'https://api.chukwumaoranu.co.uk',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // 👈 VERY IMPORTANT: send HttpOnly cookies
  timeout: 30000, // 30 seconds timeout for mobile networks
});

// Request interceptor (optional logging)
api.interceptors.request.use(
  (config) => {
    console.log('API Request:', {
      url: config.url,
      method: config.method,
      data: config.data,
      headers: config.headers
    });
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status } = error.response;

      // Handle unauthorized errors (401)
      if (status === 401 && typeof window !== 'undefined') {
        localStorage.removeItem('user');
        window.location.href = '/admin/login'; // Redirect to login
      }
    }
    return Promise.reject(error);
  }
);

export default api;
