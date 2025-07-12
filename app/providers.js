'use client';

import { useState, useEffect } from 'react';
import { ReduxProvider } from './store/provider';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from './store';
import { ThemeProvider } from '@/components/theme-provider.jsx';
import BootstrapClient from '@/components/bootstrap-client.jsx';
import { Toaster } from 'react-hot-toast';

export default function Providers({ children }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <ReduxProvider>
      {isClient ? (
        <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <BootstrapClient />
            {children}
            <Toaster 
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#363636',
                  color: '#fff',
                },
                success: {
                  duration: 3000,
                  iconTheme: {
                    primary: '#4ade80',
                    secondary: '#fff',
                  },
                },
                error: {
                  duration: 5000,
                  iconTheme: {
                    primary: '#ef4444',
                    secondary: '#fff',
                  },
                },
              }}
            />
          </ThemeProvider>
        </PersistGate>
      ) : (
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <BootstrapClient />
          {children}
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
              success: {
                duration: 3000,
                iconTheme: {
                  primary: '#4ade80',
                  secondary: '#fff',
                },
              },
              error: {
                duration: 5000,
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#fff',
                },
              },
            }}
          />
        </ThemeProvider>
      )}
    </ReduxProvider>
  );
}
