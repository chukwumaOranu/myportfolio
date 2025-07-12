'use client';

import { useState, useEffect } from 'react';

const AdminFooter = () => {
  const [isClient, setIsClient] = useState(false);
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    setIsClient(true);
    setCurrentTime(new Date().toLocaleTimeString());
    
    // Update time every second
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const currentYear = new Date().getFullYear();

  return (
    <footer className="admin-footer bg-light border-top py-3" 
            style={{ 
              position: 'fixed',
              bottom: 0,
              right: 0,
              left: '250px',
              zIndex: 999,
              height: '50px'
            }}>
      <div className="container-fluid">
        <div className="d-flex align-items-center justify-content-between">
          <div className="text-muted small">
            © {currentYear} Admin Panel. All rights reserved.
          </div>
          <div className="text-muted small">
            <span className="me-3">
              <i className="bi bi-shield-check text-success"></i>
              Secure Connection
            </span>
            <span>
              <i className="bi bi-clock text-primary"></i>
              Last updated: {isClient ? currentTime : 'Loading...'}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default AdminFooter; 