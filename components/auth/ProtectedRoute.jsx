'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';

export default function ProtectedRoute({ children }) {
  const router = useRouter();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    console.log('ProtectedRoute - isAuthenticated:', isAuthenticated);
    console.log('ProtectedRoute - user:', user);
    
    if (!isAuthenticated) {
      console.log('ProtectedRoute - Redirecting to login...');
      router.push('/admin/login');
    } else {
      console.log('ProtectedRoute - User authenticated, allowing access');
    }
    
    setIsChecking(false);
  }, [isAuthenticated, router, user]);

  // Show loading while checking auth
  if (isChecking) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  // If not authenticated, show nothing (will redirect)
  if (!isAuthenticated) {
    return null;
  }

  // If authenticated, render children
  return children;
} 