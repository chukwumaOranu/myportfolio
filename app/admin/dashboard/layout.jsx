'use client';

import { useState, useEffect } from 'react';
import AdminSideBar from "@/components/ui/dashboard/AdminSideBar";
import AdminNavbar from "@/components/ui/dashboard/AdminNavbar";
import AdminFooter from "@/components/ui/dashboard/AdminFooter";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

const DashboardLayout = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setIsCollapsed(true);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const sidebarWidth = isCollapsed ? 60 : 250;

  return (
    <ProtectedRoute>
      <div className="dashboard-layout d-flex">
        <AdminSideBar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
        <div 
          className="flex-grow-1" 
          style={{ 
            marginLeft: isMobile ? '60px' : `${sidebarWidth}px`,
            transition: 'margin-left 0.3s ease',
            width: `calc(100% - ${sidebarWidth}px)`
          }}
        >
          <AdminNavbar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
          <main 
            className="p-3 p-md-4" 
            style={{ 
              marginTop: '60px', 
              minHeight: 'calc(100vh - 60px)',
              overflowX: 'auto'
            }}
          >
            {children}
          </main>
          <AdminFooter />
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default DashboardLayout;
