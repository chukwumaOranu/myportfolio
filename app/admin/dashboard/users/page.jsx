"use client";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { fetchUsers, updateUser, deleteUser } from "@/app/store/slices/userSlice";
import { fetchProfiles } from "@/app/store/slices/profileSlice";
import { showSuccess, showError, showLoading, dismissLoading } from "@/utils/toast";

const UsersPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { users, loading, error, success, message } = useSelector((state) => state.users);
  const { profiles } = useSelector((state) => state.profiles);
  const [isClient, setIsClient] = useState(false);

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("add"); // 'add' or 'edit'
  const [selectedUser, setSelectedUser] = useState(null);
  const [form, setForm] = useState({ username: "", email: "" });

  useEffect(() => {
    setIsClient(true);
    dispatch(fetchUsers());
    dispatch(fetchProfiles());
  }, [dispatch]);

  // Show success message
  useEffect(() => {
    if (success && message) {
      showSuccess(message);
      if (modalType === "edit") {
        closeModal();
        dispatch(fetchUsers()); // Refresh the list
      }
    }
  }, [success, message, modalType, dispatch]);

  // Show error message
  useEffect(() => {
    if (error) {
      showError(error);
    }
  }, [error]);

  // Open modal for add or edit
  const openModal = (type, user = null) => {
    setModalType(type);
    setSelectedUser(user);
    setForm(user ? { username: user.username, email: user.email } : { username: "", email: "" });
    setShowModal(true);
  };

  // Close modal
  const closeModal = () => {
    setShowModal(false);
    setSelectedUser(null);
    setForm({ username: "", email: "" });
  };

  // Handle form change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submit (edit user)
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (modalType === "edit" && selectedUser) {
      const loadingToast = showLoading("Updating user...");
      
      try {
        const userData = {
          id: selectedUser.id,
          username: form.username,
          email: form.email
        };
        
        await dispatch(updateUser(userData)).unwrap();
        dismissLoading(loadingToast);
      } catch (error) {
        dismissLoading(loadingToast);
        console.error("Error updating user:", error);
        showError(error.message || "An error occurred while updating the user");
      }
    }
  };

  // Handle delete
  const handleDelete = async (user) => {
    if (window.confirm(`Are you sure you want to delete user '${user.username}'?`)) {
      const loadingToast = showLoading("Deleting user...");
      
      try {
        await dispatch(deleteUser(user.id)).unwrap();
        dismissLoading(loadingToast);
        showSuccess("User deleted successfully");
      } catch (error) {
        dismissLoading(loadingToast);
        console.error("Error deleting user:", error);
        showError(error.message || "An error occurred while deleting the user");
      }
    }
  };

  // Handle edit profile - navigate to profiles page with user ID
  const handleEditProfile = (user) => {
    // Check if user has a profile
    const userProfile = profiles?.find(profile => profile.user_id === user.id);
    
    if (userProfile) {
      // User has a profile, navigate to profiles page with the profile ID
      router.push(`/admin/dashboard/profiles?edit=${userProfile.id}&user_id=${user.id}`);
    } else {
      // User doesn't have a profile, navigate to create new profile
      router.push(`/admin/dashboard/profiles?create=true&user_id=${user.id}&username=${user.username}&email=${user.email}`);
    }
  };

  // Don't render until client-side hydration is complete
  if (!isClient) {
    return (
      <div className="container py-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="mb-0">Users</h1>
          <button className="btn btn-primary" disabled>+ Add User</button>
        </div>
        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Username</th>
                <th>Email</th>
                <th>Profile Status</th>
                <th style={{ width: 200 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={5} className="text-center">Loading...</td>
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
        <h1 className="mb-0">Users</h1>
        <button className="btn btn-primary" onClick={() => openModal("add")}>+ Add User</button>
      </div>
      {loading && <div>Loading users...</div>}
      {error && <div className="text-danger">{error}</div>}
      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Username</th>
                <th>Email</th>
                <th>Profile Status</th>
                <th style={{ width: 200 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users && users.length === 0 ? (
                <tr><td colSpan={5}>No users found.</td></tr>
              ) : (
                users && users.map((user, idx) => {
                  const userProfile = profiles?.find(profile => profile.user_id === user.id);
                  return (
                    <tr key={user.id}>
                      <td>{idx + 1}</td>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td>
                        {userProfile ? (
                          <span className="badge bg-success">
                            <i className="bi bi-check-circle me-1"></i>
                            Has Profile
                          </span>
                        ) : (
                          <span className="badge bg-warning text-dark">
                            <i className="bi bi-exclamation-circle me-1"></i>
                            No Profile
                          </span>
                        )}
                      </td>
                      <td>
                        <button 
                          className="btn btn-sm btn-outline-success me-2" 
                          onClick={() => handleEditProfile(user)}
                          title={userProfile ? "Edit Profile" : "Create Profile"}
                        >
                          <i className="bi bi-person-gear me-1"></i>
                          {userProfile ? "Edit Profile" : "Create Profile"}
                        </button>
                        <button 
                          className="btn btn-sm btn-outline-info me-2" 
                          onClick={() => openModal("edit", user)}
                          title="Edit User"
                        >
                          <i className="bi bi-pencil me-1"></i>
                          Edit
                        </button>
                        <button 
                          className="btn btn-sm btn-outline-danger" 
                          onClick={() => handleDelete(user)}
                          title="Delete User"
                        >
                          <i className="bi bi-trash me-1"></i>
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal for Add/Edit User */}
      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ background: "rgba(0,0,0,0.3)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <form onSubmit={handleSubmit}>
                <div className="modal-header">
                  <h5 className="modal-title">{modalType === "add" ? "Add User" : "Edit User"}</h5>
                  <button type="button" className="btn-close" onClick={closeModal}></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Username</label>
                    <input type="text" className="form-control" name="username" value={form.username} onChange={handleChange} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" name="email" value={form.email} onChange={handleChange} required />
                  </div>
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
    </div>
  );
};

export default UsersPage;
