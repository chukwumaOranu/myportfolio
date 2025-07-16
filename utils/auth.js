// Utility functions for authentication token management
// Using only Authorization headers for API requests (no cookies)
import { jwtDecode } from 'jwt-decode';


// Set authentication token in localStorage only
export const setAuthToken = (token) => {
  if (typeof window !== 'undefined') {
    // Store in localStorage for client-side access and API requests
    localStorage.setItem('token', token);
  }
};

// Get authentication token from localStorage
export const getAuthToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
};

// Clear authentication token from localStorage
export const clearAuthToken = () => {
  if (typeof window !== 'undefined') {
    // Clear from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};

// Set user data in localStorage
export const setUserData = (user) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('user', JSON.stringify(user));
  }
};

// Get user data from localStorage
export const getUserData = () => {
  if (typeof window !== 'undefined') {
    try {
      const user = localStorage.getItem('user');
      if (!user || user.trim() === '') {
        localStorage.removeItem('user');
        return null;
      }
      return JSON.parse(user);
    } catch {
      localStorage.removeItem('user');
      return null;
    }
  }
  return null;
};

// Check if a JWT token is expired
export const isTokenExpired = (token) => {
  if (!token) return true;
  try {
    const decoded = jwtDecode(token);
    if (!decoded.exp) return true;
    // exp is in seconds, Date.now() is in ms
    return Date.now() >= decoded.exp * 1000;
  } catch (e) {
    return true;
  }
};