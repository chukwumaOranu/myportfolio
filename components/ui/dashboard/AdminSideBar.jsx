'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const AdminSideBar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    {
      name: 'Dashboard',
      icon: '📊',
      path: '/admin/dashboard'
    },
    {
      name: 'Users',
      icon: '👥',
      path: '/admin/dashboard/users'
    },
    {
      name: 'Contacts',
      icon: '📧',
      path: '/admin/dashboard/contacts'
    },
    {
      name: 'Profiles',
      icon: '👤',
      path: '/admin/dashboard/profiles'
    },
    {
      name: 'Projects',
      icon: '📁',
      path: '/admin/dashboard/projects'
    },
    {
      name: 'Technologies',
      icon: '⚙️',
      path: '/admin/dashboard/technologies'
    }
  ];

  return (
    <div className={`sidebar bg-dark text-white ${isCollapsed ? 'collapsed' : ''}`} 
         style={{ 
           width: isCollapsed ? '60px' : '250px', 
           minHeight: '100vh',
           transition: 'width 0.3s ease',
           position: 'fixed',
           left: 0,
           top: 0,
           zIndex: 1000
         }}>
      
      <div className="d-flex align-items-center justify-content-between p-3 border-bottom border-secondary">
        {!isCollapsed && (
          <h5 className="mb-0 text-white">Admin Panel</h5>
        )}
        <button 
          className="btn btn-outline-light btn-sm"
          onClick={() => setIsCollapsed(!isCollapsed)}
          style={{ minWidth: '32px' }}
        >
          {isCollapsed ? '→' : '←'}
        </button>
      </div>

      <nav className="mt-3">
        <ul className="nav flex-column">
          {menuItems.map((item) => (
            <li key={item.path} className="nav-item">
              <Link 
                href={item.path}
                className={`nav-link d-flex align-items-center px-3 py-2 text-white ${
                  pathname === item.path ? 'bg-primary' : 'hover-bg-secondary'
                }`}
                style={{ 
                  textDecoration: 'none',
                  transition: 'background-color 0.2s ease'
                }}
              >
                <span className="me-2" style={{ fontSize: '1.2rem' }}>
                  {item.icon}
                </span>
                {!isCollapsed && <span>{item.name}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-auto p-3 border-top border-secondary">
        {!isCollapsed && (
          <div className="text-center">
            <small className="text-muted">Admin Panel v1.0</small>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminSideBar;
