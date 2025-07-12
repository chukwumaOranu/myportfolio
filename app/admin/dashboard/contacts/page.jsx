"use client";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { 
  getContactForms, 
  updateContactForm, 
  deleteContactForm,
  clearContactState 
} from "@/app/store/slices/contactSlice";
import { showSuccess, showError } from "@/utils/toast";

const ContactsPage = () => {
  const dispatch = useDispatch();
  const { forms, loading, error, success } = useSelector((state) => state.contacts);
  const [isClient, setIsClient] = useState(false);

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("add"); // 'add' or 'edit'
  const [selectedForm, setSelectedForm] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  useEffect(() => {
    setIsClient(true);
    dispatch(getContactForms());
  }, [dispatch]);

  // Clear success/error messages when component unmounts
  useEffect(() => {
    return () => {
      dispatch(clearContactState());
    };
  }, [dispatch]);

  // Show success/error messages
  useEffect(() => {
    if (success) {
      showSuccess("Operation completed successfully!");
      dispatch(clearContactState());
    }
    if (error) {
      showError(error);
      dispatch(clearContactState());
    }
  }, [success, error, dispatch]);

  // Open modal for add or edit
  const openModal = (type, contact = null) => {
    setModalType(type);
    setSelectedForm(contact);
    setForm(
      contact
        ? {
            name: contact.name || "",
            email: contact.email || "",
            subject: contact.subject || "",
            message: contact.message || ""
          }
        : { name: "", email: "", subject: "", message: "" }
    );
    setShowModal(true);
  };

  // Close modal
  const closeModal = () => {
    setShowModal(false);
    setSelectedForm(null);
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  // Handle form change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submit (edit only - add is handled by public contact form)
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (modalType === "edit" && selectedForm) {
      try {
        await dispatch(updateContactForm({ 
          id: selectedForm.id, 
          formData: form 
        })).unwrap();
        closeModal();
      } catch (error) {
        console.error('Update failed:', error);
      }
    }
  };

  // Handle delete
  const handleDelete = async (contact) => {
    if (window.confirm(`Are you sure you want to delete contact from '${contact.name}'?`)) {
      try {
        await dispatch(deleteContactForm(contact.id)).unwrap();
      } catch (error) {
        console.error('Delete failed:', error);
      }
    }
  };

  // Don't render until client-side hydration is complete
  if (!isClient) {
    return (
      <div className="container py-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="mb-0">Contact Forms</h1>
          <button className="btn btn-primary" disabled>+ Add Contact</button>
        </div>
        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Subject</th>
                <th>Message</th>
                <th>Date</th>
                <th style={{ width: 150 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={7} className="text-center">Loading...</td>
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
        <h1 className="mb-0">Contact Forms</h1>
        <div className="d-flex gap-2">
          <span className="badge bg-primary fs-6 px-3 py-2">
            {forms ? forms.length : 0} Forms
          </span>
        </div>
      </div>
      
      {loading && (
        <div className="text-center py-4">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading contact forms...</p>
        </div>
      )}
      
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      
      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Subject</th>
                <th>Message</th>
                <th>Date</th>
                <th style={{ width: 150 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {forms && forms.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-4">
                    <i className="bi bi-inbox display-4 text-muted"></i>
                    <p className="mt-2 text-muted">No contact forms found.</p>
                  </td>
                </tr>
              ) : (
                forms && forms.map((contact, idx) => (
                  <tr key={contact.id}>
                    <td>{idx + 1}</td>
                    <td>
                      <strong>{contact.name}</strong>
                    </td>
                    <td>
                      <a href={`mailto:${contact.email}`} className="text-decoration-none">
                        {contact.email}
                      </a>
                    </td>
                    <td>
                      <span className="badge bg-light text-dark">
                        {contact.subject || 'No Subject'}
                      </span>
                    </td>
                    <td>
                      <div className="text-truncate" style={{ maxWidth: 200 }} title={contact.message}>
                        {contact.message || 'No message'}
                      </div>
                    </td>
                    <td>
                      <small className="text-muted">
                        {new Date(contact.created_at).toLocaleDateString()}
                      </small>
                    </td>
                    <td>
                      <div className="btn-group" role="group">
                        <button 
                          className="btn btn-sm btn-outline-info" 
                          onClick={() => openModal("edit", contact)}
                          title="Edit"
                        >
                          <i className="bi bi-pencil"></i>
                        </button>
                        <button 
                          className="btn btn-sm btn-outline-danger" 
                          onClick={() => handleDelete(contact)}
                          title="Delete"
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal for Edit Contact */}
      {showModal && modalType === "edit" && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ background: "rgba(0,0,0,0.3)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <form onSubmit={handleSubmit}>
                <div className="modal-header">
                  <h5 className="modal-title">Edit Contact Form</h5>
                  <button type="button" className="btn-close" onClick={closeModal}></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      name="name" 
                      value={form.name} 
                      onChange={handleChange} 
                      required 
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input 
                      type="email" 
                      className="form-control" 
                      name="email" 
                      value={form.email} 
                      onChange={handleChange} 
                      required 
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Subject</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      name="subject" 
                      value={form.subject} 
                      onChange={handleChange} 
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Message</label>
                    <textarea 
                      className="form-control" 
                      name="message" 
                      value={form.message} 
                      onChange={handleChange} 
                      rows={4} 
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={closeModal}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Save Changes
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

export default ContactsPage;
