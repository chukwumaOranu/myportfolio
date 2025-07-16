'use client';

import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCountUsers } from '@/app/store/slices/userSlice';
import { getContactStats } from '@/app/store/slices/contactSlice';
import { getCountProfiles } from '@/app/store/slices/profileSlice';
import { getProfile } from '@/app/store/slices/userSlice';
import { getContactForms } from '@/app/store/slices/contactSlice';
import Link from "next/link";

const DashboardPage = () => {
  const [isClient, setIsClient] = useState(false);
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const userCount = useSelector((state) => state.users.count);
  const usersLoading = useSelector((state) => state.users.loading);
  const contactForms = useSelector((state) => state.contacts.forms);
  const contactsLoading = useSelector((state) => state.contacts.loading);
  const profileCount = useSelector((state) => state.profiles.count);
  const profilesLoading = useSelector((state) => state.profiles.loading);
  
  // Prevent hydration mismatch by only rendering user data on client
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  useEffect(() => {
    dispatch(getCountUsers());
    dispatch(getContactStats());
    dispatch(getCountProfiles());
    dispatch(getContactForms());
    // Fetch current user profile if authenticated and user id exists
    if (isAuthenticated && user && user.id) {
      dispatch(getProfile(user.id));
    }
  }, [dispatch, isAuthenticated, user]);
  
  const stats = {
    users: usersLoading ? '...' : userCount ?? 0,
    contacts: contactsLoading ? '...' : (contactForms ? contactForms.length : 0),
    profiles: profilesLoading ? '...' : profileCount ?? 0,
  };

  const statCards = [
    {
      icon: '👥',
      number: stats.users,
      caption: 'Number of Users',
      color: 'primary'
    },
    {
      icon: '📧',
      number: stats.contacts,
      caption: 'Number of Contacts',
      color: 'success'
    },
    {
      icon: '👤',
      number: stats.profiles,
      caption: 'Number of Profiles',
      color: 'info'
    }
  ];

  // Get display name from user data
  const getDisplayName = () => {
    if (!isClient || !user) return '';
    
    // Try different possible user data structures (including nested)
    return user.user?.username || user.username || user.name || user.full_name || user.email || 'User';
  };

  return (
    <div className="dashboard-page">
      {/* Welcome Section */}
      <div className="mb-4">
        <h1 className="h3 mb-2">Welcome back, {getDisplayName()}! 👋</h1>
        <p className="text-muted">Here's what's happening with your application today.</p>
      </div>

      {/* Statistics Cards */}
      {isClient && (
        <div className="row g-4 mb-4">
          {statCards.map((card, index) => (
            <div key={index} className="col-md-4">
              <div className={`card border-0 shadow-sm h-100 bg-${card.color} bg-opacity-10`}>
                <div className="card-body">
                  <div className="d-flex align-items-center justify-content-between">
                    <div>
                      <div className="d-flex align-items-center mb-2">
                        <span className="fs-1 me-3">{card.icon}</span>
                        <div>
                          <h2 className="h1 mb-0 fw-bold text-primary">{card.number}</h2>
                          <p className="text-muted mb-0 small">{card.caption}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Quick Actions */}
      <div className="row g-4">
        <div className="col-md-6">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-light">
              <h5 className="mb-0">Quick Actions</h5>
            </div>
            <div className="card-body">
              <div className="d-grid gap-2">
                <button className="btn btn-outline-primary">
                  <span className="me-2">➕</span>
                  Add New User
                </button>
                <Link href="/admin/dashboard/contacts" className="btn btn-outline-success">
                  <span className="me-2">📧</span>
                  View Messages
                </Link>
                <button className="btn btn-outline-info">
                  <span className="me-2">📊</span>
                  View Reports
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-light">
              <h5 className="mb-0">Recent Activity</h5>
            </div>
            <div className="card-body">
              <div className="list-group list-group-flush">
                <div className="list-group-item d-flex align-items-center">
                  <span className="badge bg-success me-3">New</span>
                  <div>
                    <strong>New user registered</strong>
                    <br />
                    <small className="text-muted">2 minutes ago</small>
                  </div>
                </div>
                <div className="list-group-item d-flex align-items-center">
                  <span className="badge bg-info me-3">Message</span>
                  <div>
                    <strong>New contact message</strong>
                    <br />
                    <small className="text-muted">5 minutes ago</small>
                  </div>
                </div>
                <div className="list-group-item d-flex align-items-center">
                  <span className="badge bg-warning me-3">Update</span>
                  <div>
                    <strong>Profile updated</strong>
                    <br />
                    <small className="text-muted">10 minutes ago</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;