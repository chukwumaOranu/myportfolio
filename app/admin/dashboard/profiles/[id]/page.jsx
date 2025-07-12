"use client";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter, useParams } from "next/navigation";
import { fetchProfileById } from "@/app/store/slices/profileSlice";
import { showError } from "@/utils/toast";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

const ViewProfilePage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const params = useParams();
  const { profile, loading, error } = useSelector((state) => state.profiles);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient && params.id) {
      dispatch(fetchProfileById(params.id));
    }
  }, [isClient, params.id, dispatch]);

  useEffect(() => {
    if (error) {
      showError(error);
    }
  }, [error]);

  // Don't render until client-side hydration is complete
  if (!isClient) {
    return (
      <div className="container py-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="mb-0">Profile Details</h1>
          <button className="btn btn-secondary" disabled>← Back to Profiles</button>
        </div>
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container py-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="mb-0">Profile Details</h1>
          <button className="btn btn-secondary" onClick={() => router.back()}>← Back to Profiles</button>
        </div>
        <div className="text-center">Loading profile...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="mb-0">Profile Details</h1>
          <button className="btn btn-secondary" onClick={() => router.back()}>← Back to Profiles</button>
        </div>
        <div className="alert alert-danger">
          <h4>Error Loading Profile</h4>
          <p>{error}</p>
          <button className="btn btn-primary" onClick={() => router.push('/admin/dashboard/profiles')}>
            Go to Profiles List
          </button>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="container py-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="mb-0">Profile Details</h1>
          <button className="btn btn-secondary" onClick={() => router.back()}>← Back to Profiles</button>
        </div>
        <div className="alert alert-warning">
          <h4>Profile Not Found</h4>
          <p>The profile you're looking for doesn't exist or has been removed.</p>
          <button className="btn btn-primary" onClick={() => router.push('/admin/dashboard/profiles')}>
            Go to Profiles List
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="mb-0">Profile Details</h1>
        <div>
          <button 
            className="btn btn-outline-primary me-2" 
            onClick={() => router.push(`/admin/dashboard/profiles?edit=${profile.id}`)}
          >
            Edit Profile
          </button>
          <button className="btn btn-secondary" onClick={() => router.back()}>
            ← Back to Profiles
          </button>
        </div>
      </div>

      <div className="row">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body text-center">
              {profile.profile_image ? (
                <img 
                  src={`${API_URL}/uploads/profile-pictures/${profile.profile_image}`} 
                  alt={`${profile.full_name || profile.fullName} profile`}
                  className="rounded-circle mb-3"
                  style={{ 
                    width: '200px', 
                    height: '200px', 
                    objectFit: 'cover',
                    border: '3px solid #dee2e6'
                  }}
                />
              ) : (
                <div 
                  className="rounded-circle bg-light d-flex align-items-center justify-content-center mx-auto mb-3"
                  style={{ 
                    width: '200px', 
                    height: '200px',
                    border: '3px solid #dee2e6'
                  }}
                >
                  <i className="bi bi-person text-muted" style={{ fontSize: '4rem' }}></i>
                </div>
              )}
              <h3 className="card-title">{profile.full_name || profile.fullName}</h3>
              <p className="text-muted">{profile.profession || 'No profession specified'}</p>
            </div>
          </div>
        </div>

        <div className="col-md-8">
          <div className="card">
            <div className="card-header">
              <h4 className="mb-0">Profile Information</h4>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <table className="table table-borderless">
                    <tbody>
                      <tr>
                        <td><strong>Full Name:</strong></td>
                        <td>{profile.full_name || profile.fullName || 'Not specified'}</td>
                      </tr>
                      <tr>
                        <td><strong>Email:</strong></td>
                        <td>{profile.email || 'Not specified'}</td>
                      </tr>
                      <tr>
                        <td><strong>Profession:</strong></td>
                        <td>{profile.profession || 'Not specified'}</td>
                      </tr>
                      <tr>
                        <td><strong>Role:</strong></td>
                        <td>
                          <span className="badge bg-primary">{profile.role_name || 'Not specified'}</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="col-md-6">
                  <table className="table table-borderless">
                    <tbody>
                      <tr>
                        <td><strong>Age:</strong></td>
                        <td>{profile.age || 'Not specified'}</td>
                      </tr>
                      <tr>
                        <td><strong>Date of Birth:</strong></td>
                        <td>
                          {profile.date_of_birth 
                            ? new Date(profile.date_of_birth).toLocaleDateString() 
                            : 'Not specified'
                          }
                        </td>
                      </tr>
                      <tr>
                        <td><strong>User ID:</strong></td>
                        <td>{profile.user_id || 'Not specified'}</td>
                      </tr>
                      <tr>
                        <td><strong>Profile ID:</strong></td>
                        <td>{profile.id}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div className="card mt-4">
            <div className="card-header">
              <h4 className="mb-0">Actions</h4>
            </div>
            <div className="card-body">
              <div className="d-flex gap-2">
                <button 
                  className="btn btn-primary" 
                  onClick={() => router.push(`/admin/dashboard/profiles?edit=${profile.id}`)}
                >
                  <i className="bi bi-pencil me-2"></i>
                  Edit Profile
                </button>
                <button 
                  className="btn btn-outline-info" 
                  onClick={() => router.push('/admin/dashboard/profiles')}
                >
                  <i className="bi bi-list me-2"></i>
                  View All Profiles
                </button>
                <button 
                  className="btn btn-outline-secondary" 
                  onClick={() => router.back()}
                >
                  <i className="bi bi-arrow-left me-2"></i>
                  Go Back
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProfilePage; 