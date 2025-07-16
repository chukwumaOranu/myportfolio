import api from './api';
import store from '@/app/store';
import { clearAuth } from '@/app/store/slices/authSlice';

// Set up the response interceptor here to avoid circular imports
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status } = error.response;
      if (status === 401 && typeof window !== 'undefined') {
        import('@/utils/auth').then(({ clearAuthToken }) => clearAuthToken());
        store.dispatch(clearAuth());
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(error);
  }
);

// No export needed, just import this file once in your app entry point 