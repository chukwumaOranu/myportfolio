'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { getAuthToken, isTokenExpired, clearAuthToken } from '@/utils/auth';
import { clearAuth } from '@/app/store/slices/authSlice';
import { jwtDecode } from 'jwt-decode';

export default function ProtectedRoute({ children }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const token = getAuthToken();
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded.exp) {
          const expDate = new Date(decoded.exp * 1000);
          console.log('Token expires at:', expDate.toLocaleString());
        }
      } catch (e) {
        // ignore
      }
    }
    if (!token || isTokenExpired(token)) {
      clearAuthToken();
      dispatch(clearAuth());
      router.replace('/admin/login');
    }
  }, [router, dispatch]);

  if (!isClient) {
    return null; // Prevent hydration mismatch
  }

  if (!getAuthToken() || isTokenExpired(getAuthToken())) {
    return null;
  }

  return <>{children}</>;
} 