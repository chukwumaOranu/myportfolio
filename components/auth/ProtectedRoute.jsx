'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';

export default function ProtectedRoute({ children }) {
  const router = useRouter();
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!isAuthenticated) {
      // Redirect to login if not authenticated
      router.push('/admin/login');
    }
  }, [isAuthenticated, router]);

  // Show loading or nothing while checking auth
  if (!isAuthenticated) {
    return null;
  }

  // If authenticated, render children
  return children;
} 