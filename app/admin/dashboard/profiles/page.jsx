"use client";

import { useEffect, useState, Suspense } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter, useSearchParams } from "next/navigation";
import { fetchProfiles, createProfile, updateProfile, deleteProfile, clearProfileState } from "@/app/store/slices/profileSlice";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// Separate component that uses useSearchParams
const ProfilesPageContent = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { profiles, loading, error, success, message } = useSelector((state) => state.profiles);
  const [isClient, setIsClient] = useState(false);

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("add"); // 'add' or 'edit'
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    profession: "",
    role_name: "",
    age: "",
    user_id: "",
    profile_image: null
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    setIsClient(true);
    dispatch(fetchProfiles());
  }, [dispatch]);

  // Handle URL parameters for editing or creating profiles
  useEffect(() => {
    if (isClient && profiles && profiles.length > 0) {
      const editId = searchParams.get('edit');
      const create = searchParams.get('create');
      const userId = searchParams.get('user_id');
      const username = searchParams.get('username');
      const email = searchParams.get('email');

      if (editId) {
        // Find the profile to edit
        const profileToEdit = profiles.find(profile => profile.id == editId);
        if (profileToEdit) {
          openModal("edit", profileToEdit);
        }
      } else if (create && userId) {
        // Create new profile for specific user
        setForm({
          full_name: username || "",
          email: email || "",
          profession: "",
          role_name: "",
          age: "",
          user_id: userId
        });
        setModalType("add");
        setShowModal(true);
      }
    }
  }, [isClient, profiles, searchParams]);

  // Show success message and refresh data
  useEffect(() => {
    if (success && message) {
      alert(message); // You can replace this with a toast notification
      if (modalType === "add" || modalType === "edit") {
        closeModal();
        dispatch(fetchProfiles()); // Refresh the list
        // Clear URL parameters after successful operation
        router.replace('/admin/dashboard/profiles');
      }
      // Clear the success state after showing the message
      dispatch(clearProfileState());
    }
  }, [success, message, modalType, dispatch, router]);

  // Open modal for add or edit
  const openModal = (type, profile = null) => {
    setModalType(type);
    setSelectedProfile(profile);
    setForm(
      profile
        ? {
            full_name: profile.full_name || profile.fullName || "",
            email: profile.email || "",
            profession: profile.profession || "",
            role_name: profile.role_name || "",
            age: profile.age || "",
            user_id: profile.user_id || "",
            profile_image: profile.profile_image || null
          }
        : { full_name: "", email: "", profession: "", role_name: "", age: "", user_id: "", profile_image: null }
    );
    
    // Set image preview for existing profile
    if (profile?.profile_image) {
      setImagePreview(null); // Clear any previous preview
      setImageFile(null); // Clear any previous file
    } else {
      setImagePreview(null);
      setImageFile(null);
    }
    
    setShowModal(true);
  };

  // Close modal
  const closeModal = () => {
    setShowModal(false);
    setSelectedProfile(null);
    setForm({ full_name: "", email: "", profession: "", role_name: "", age: "", user_id: "", profile_image: null });
    setImagePreview(null);
    setImageFile(null);
  };

  // Handle form change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle image file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle remove image
  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(null);
    setForm(prev => ({ ...prev, profile_image: null }));
  };

  // Handle form submit (add or edit)
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Create FormData for file upload
      const formData = new FormData();
      formData.append('full_name', form.full_name);
      formData.append('email', form.email);
      formData.append('profession', form.profession);
      formData.append('role_name', form.role_name);
      formData.append('age', form.age);
      if (form.user_id) {
        formData.append('user_id', form.user_id);
      }
      
      // Add image file if selected
      if (imageFile) {
        formData.append('profilePicture', imageFile);
      }
      
      if (modalType === "add") {
        // Create new profile
        await dispatch(createProfile(formData)).unwrap();
      } else if (modalType === "edit" && selectedProfile) {
        // Update existing profile
        formData.append('id', selectedProfile.id);
        await dispatch(updateProfile(formData)).unwrap();
      }
    } catch (error) {
      console.error("Error details:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      // Error is already handled by Redux and will show in the UI
    }
  };

  // Handle delete
  const handleDelete = async (profile) => {
    if (window.confirm(`Are you sure you want to delete profile '${profile.full_name || profile.fullName}'?`)) {
      try {
        await dispatch(deleteProfile(profile.id)).unwrap();
      } catch (error) {
        console.error("Error deleting profile:", error);
        // Error is already handled by Redux and will show in the UI
      }
    }
  };

  // Handle image click to show larger preview
  const handleImageClick = (imageUrl, profileName) => {
    setSelectedImage({ url: imageUrl, name: profileName });
    setShowImageModal(true);
  };

  // Don't render until client-side hydration is complete
  if (!isClient) {
    return (
      <div className="container py-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="mb-0">Profiles</h1>
          <button className="btn btn-primary" disabled>+ Add Profile</button>
        </div>
        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Profile Image</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Profession</th>
                <th>Role</th>
                <th>Age</th>
                <th style={{ width: 150 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={8} className="text-center">Loading...</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="mb-0">Profiles</h1>
        <button className="btn btn-primary" onClick={() => openModal("add")}>+ Add Profile</button>
      </div>
      {loading && <div>Loading profiles...</div>}
      {error && <div className="text-danger">{error}</div>}
      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Profile Image</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Profession</th>
                <th>Role</th>
                <th>Age</th>
                <th style={{ width: 150 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {profiles && profiles.length === 0 ? (
                <tr><td colSpan={8}>No profiles found.</td></tr>
              ) : (
                profiles && profiles.map((profile, idx) => (
                  <tr key={profile.id}>
                    <td>{idx + 1}</td>
                    <td>
                      {profile.profile_image ? (
                        <img 
                          src={`${API_URL}/uploads/profile-pictures/${profile.profile_image}`} 
                          alt={`${profile.full_name || profile.fullName} profile`}
                          className="rounded-circle"
                          style={{ 
                            width: '50px', 
                            height: '50px', 
                            objectFit: 'cover',
                            cursor: 'pointer',
                            transition: 'transform 0.2s ease-in-out'
                          }}
                          onClick={() => handleImageClick(`${API_URL}/uploads/profile-pictures/${profile.profile_image}`, profile.full_name || profile.fullName)}
                          onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
                          onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                          title="Click to view larger image"
                        />
                      ) : (
                        <div 
                          className="rounded-circle bg-light d-flex align-items-center justify-content-center"
                          style={{ 
                            width: '50px', 
                            height: '50px',
                            cursor: 'pointer',
                            transition: 'transform 0.2s ease-in-out'
                          }}
                          onClick={() => handleImageClick(null, null)}
                          onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
                          onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                          title="No profile image"
                        >
                          <i className="bi bi-person text-muted"></i>
                        </div>
                      )}
                    </td>
                    <td>{profile.full_name || profile.fullName}</td>
                    <td>{profile.email}</td>
                    <td>{profile.profession}</td>
                    <td>{profile.role_name}</td>
                    <td>{profile.age}</td>
                    <td>
                      <button className="btn btn-sm btn-outline-info me-2" onClick={() => openModal("edit", profile)}>Edit</button>
                      <button className="btn btn-sm btn-outline-danger me-2" onClick={() => handleDelete(profile)}>Delete</button>
                      <button className="btn btn-sm btn-outline-primary" onClick={() => router.push(`/admin/dashboard/profiles/${profile.id}`)}>View</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal for Add/Edit Profile */}
      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ background: "rgba(0,0,0,0.3)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <form onSubmit={handleSubmit}>
                <div className="modal-header">
                  <h5 className="modal-title">{modalType === "add" ? "Add Profile" : "Edit Profile"}</h5>
                  <button type="button" className="btn-close" onClick={closeModal}></button>
                </div>
                <div className="modal-body">
                  {/* Profile Image Upload */}
                  <div className="mb-3">
                    <label className="form-label">Profile Image</label>
                    <div className="d-flex align-items-center gap-3">
                      <div className="flex-shrink-0 position-relative">
                        {(imagePreview || (selectedProfile?.profile_image)) ? (
                          <>
                            <img 
                              src={imagePreview || `${API_URL}/uploads/profile-pictures/${selectedProfile?.profile_image}`} 
                              alt="Profile preview" 
                              className="rounded-circle"
                              style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                            />
                            <button
                              type="button"
                              className="btn btn-sm btn-danger position-absolute top-0 end-0 rounded-circle"
                              style={{ width: '24px', height: '24px', fontSize: '12px' }}
                              onClick={handleRemoveImage}
                              title="Remove image"
                            >
                              <i className="bi bi-x"></i>
                            </button>
                          </>
                        ) : (
                          <div 
                            className="rounded-circle bg-light d-flex align-items-center justify-content-center"
                            style={{ width: '80px', height: '80px' }}
                          >
                            <i className="bi bi-person text-muted" style={{ fontSize: '2rem' }}></i>
                          </div>
                        )}
                      </div>
                      <div className="flex-grow-1">
                        <input
                          type="file"
                          className="form-control"
                          accept="image/*"
                          onChange={handleImageChange}
                          id="profile_image"
                        />
                        <div className="form-text">Upload a profile image (JPG, PNG, GIF)</div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Full Name</label>
                    <input type="text" className="form-control" name="full_name" value={form.full_name} onChange={handleChange} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" name="email" value={form.email} onChange={handleChange} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Profession</label>
                    <input type="text" className="form-control" name="profession" value={form.profession} onChange={handleChange} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Role</label>
                    <input type="text" className="form-control" name="role_name" value={form.role_name} onChange={handleChange} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Age</label>
                    <input type="number" className="form-control" name="age" value={form.age} onChange={handleChange} />
                  </div>
                  {form.user_id && (
                    <input type="hidden" name="user_id" value={form.user_id} />
                  )}
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={closeModal}>Cancel</button>
                  <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? "Saving..." : (modalType === "add" ? "Add" : "Save")}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Image Preview Modal */}
      {showImageModal && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ background: "rgba(0,0,0,0.8)" }}>
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content bg-transparent border-0">
              <div className="modal-header border-0">
                <h5 className="modal-title text-white">{selectedImage?.name || 'Profile Image'}</h5>
                <button 
                  type="button" 
                  className="btn-close btn-close-white" 
                  onClick={() => setShowImageModal(false)}
                ></button>
              </div>
              <div className="modal-body text-center p-0">
                {selectedImage?.url ? (
                  <img 
                    src={selectedImage.url} 
                    alt={selectedImage.name || 'Profile image'} 
                    className="img-fluid rounded"
                    style={{ maxHeight: '70vh', objectFit: 'contain' }}
                  />
                ) : (
                  <div className="bg-light rounded d-flex align-items-center justify-content-center" style={{ height: '300px' }}>
                    <div className="text-center">
                      <i className="bi bi-person text-muted" style={{ fontSize: '4rem' }}></i>
                      <p className="text-muted mt-2">No profile image available</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const ProfilesPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProfilesPageContent />
    </Suspense>
  );
};

export default ProfilesPage;
