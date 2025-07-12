'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '@/app/store/slices/authSlice';

const AdminNavbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const dropdownRef = useRef(null);

  console.log(user)

  // Prevent hydration mismatch by only rendering user data on client
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Close dropdown when user state changes (e.g., after logout)
  useEffect(() => {
    if (!user) {
      setIsDropdownOpen(false);
    }
  }, [user]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
      router.push('/admin/login');
    } catch (error) {
      console.error('Logout failed:', error);
      // Even if logout fails, clear local state and redirect
      router.push('/admin/login');
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom shadow-sm" 
         style={{ 
           position: 'fixed',
           top: 0,
           right: 0,
           left: '250px',
           zIndex: 999,
           height: '60px'
         }}>
      
      <div className="container-fluid">
        <div className="d-flex align-items-center">
          <h4 className="mb-0 text-dark">Dashboard</h4>
        </div>

        <div className="d-flex align-items-center">
          {/* Notifications */}
          <div className="dropdown me-3">
            <button 
              className="btn btn-outline-secondary position-relative"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              🔔
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                3
              </span>
            </button>
            <ul className="dropdown-menu dropdown-menu-end">
              <li><a className="dropdown-item" href="#">New user registered</a></li>
              <li><a className="dropdown-item" href="#">New contact message</a></li>
              <li><a className="dropdown-item" href="#">Profile updated</a></li>
            </ul>
          </div>

          {/* User Profile */}
          <div className="dropdown" ref={dropdownRef}>
            <button 
              className="btn btn-outline-primary dropdown-toggle d-flex align-items-center"
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span className="me-2">👤</span>
              <span>{isClient ? (user?.username || user?.user?.username || '') : ''}</span>
            </button>
            
            {isDropdownOpen && (
              <div className="dropdown-menu dropdown-menu-end show" 
                   style={{ 
                     minWidth: '200px',
                     maxWidth: '250px',
                     position: 'absolute',
                     right: '0',
                     top: '100%',
                     zIndex: 1050,
                     marginTop: '5px',
                     boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                     border: '1px solid rgba(0,0,0,0.1)',
                     borderRadius: '8px'
                   }}>
                <div className="dropdown-header px-3 py-2">
                  <strong>{isClient ? (user?.username || user?.user?.username || '') : ''}</strong>
                  <br />
                  <small className="text-muted">{isClient ? (user?.email || user?.user?.email || '') : ''}</small>
                </div>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item px-3 py-2" href="#">
                  <span className="me-2">⚙️</span>
                  Settings
                </a>
                <a className="dropdown-item px-3 py-2" href="#">
                  <span className="me-2">👤</span>
                  Profile
                </a>
                <div className="dropdown-divider"></div>
                <button 
                  className="dropdown-item text-danger px-3 py-2"
                  onClick={handleLogout}
                  style={{ border: 'none', background: 'none', width: '100%', textAlign: 'left' }}
                >
                  <span className="me-2">🚪</span>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
