import { logout } from './authSlice';

export const checkTokenExpiry = (dispatch) => {
  const tokenExpiry = localStorage.getItem('tokenExpiry');
  if (tokenExpiry) {
    const expiryTime = parseInt(tokenExpiry, 10) * 1000;
    const currentTime = Date.now();
    if (currentTime >= expiryTime) {
      dispatch(logout());
    } else {
      // Set timeout for auto logout
      setTimeout(() => {
        dispatch(logout());
        console.warn('Auto-logged out due to token expiry');
      }, expiryTime - currentTime);
    }
  }
};
