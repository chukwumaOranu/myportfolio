"use client"

import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { submitContactForm, clearContactState } from "@/app/store/slices/contactSlice"
import { fetchPublicProfile, selectPublicProfile } from "@/app/store/slices/profileCaseSlice"
import { showSuccess, showError } from "@/utils/toast"

export default function ContactPage() {
  const dispatch = useDispatch()
  const { loading, error, success } = useSelector((state) => state.contacts)
  const profile = useSelector(selectPublicProfile)
  const [isMounted, setIsMounted] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [formErrors, setFormErrors] = useState({})

  useEffect(() => {
    setIsMounted(true)
    // Fetch profile data for contact information
    dispatch(fetchPublicProfile())
  }, [dispatch])

  // Clear error/success state when component unmounts
  useEffect(() => {
    return () => {
      dispatch(clearContactState())
    }
  }, [dispatch])

  // Show success/error messages
  useEffect(() => {
    if (success) {
      showSuccess("Your message has been sent successfully! I'll get back to you soon.")
      setFormData({ name: "", email: "", subject: "", message: "" })
      setFormErrors({})
      dispatch(clearContactState())
    }
    if (error) {
      showError(error)
      dispatch(clearContactState())
    }
  }, [success, error, dispatch])

  const validateForm = () => {
    const errors = {}
    
    if (!formData.name.trim()) {
      errors.name = "Name is required"
    } else if (formData.name.trim().length < 2) {
      errors.name = "Name must be at least 2 characters"
    }
    
    if (!formData.email.trim()) {
      errors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please enter a valid email address"
    }
    
    if (!formData.subject.trim()) {
      errors.subject = "Subject is required"
    } else if (formData.subject.trim().length < 5) {
      errors.subject = "Subject must be at least 5 characters"
    }
    
    if (!formData.message.trim()) {
      errors.message = "Message is required"
    } else if (formData.message.trim().length < 10) {
      errors.message = "Message must be at least 10 characters"
    }
    
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: "" }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validate form before submission
    if (!validateForm()) {
      return
    }
    
    // Clear any previous state
    dispatch(clearContactState())
    
    try {
      // Submit the form using Redux thunk
      await dispatch(submitContactForm(formData)).unwrap()
    } catch (error) {
      console.error('Form submission error:', error)
    }
  }

  return (
    <div className="page-top-spacing">
      <section className="py-5 bg-gradient-primary text-dark" style={{ background: 'linear-gradient(45deg, rgba(0, 123, 255, 0.1), rgba(0, 212, 255, 0.1))' }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto text-center">
              <h1 className="display-3 fw-bold mb-4">Let's Work Together</h1>
              <p className="lead fs-4">Ready to bring your ideas to life? Let's discuss your next project</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5 bg-light">
        <div className="container">
          <div className="row g-5">
            <div className="col-lg-4">
              <div className="sticky-top" style={{ top: "100px" }}>
                <h3 className="mb-4">Get In Touch</h3>
                <p className="text-muted mb-4">
                  I'm currently available for freelance projects and full-time opportunities. Let's discuss how we can
                  work together.
                </p>

                <div className="contact-info mb-4">
                  <div className="d-flex align-items-center mb-3">
                    <div className="bg-primary rounded-circle p-3 me-3">
                      <i className="bi bi-geo-alt text-white"></i>
                    </div>
                    <div>
                      <h6 className="mb-0">Location</h6>
                      <small className="text-muted">
                        United Kingdom
                      </small>
                    </div>
                  </div>
                  <div className="d-flex align-items-center mb-3">
                    <div className="bg-success rounded-circle p-3 me-3">
                      <i className="bi bi-envelope text-white"></i>
                    </div>
                    <div>
                      <h6 className="mb-0">Email</h6>
                      <small className="text-muted">
                        info.chukwumaoranu.co.uk
                      </small>
                    </div>
                  </div>
                  <div className="d-flex align-items-center mb-3">
                    <div className="bg-warning rounded-circle p-3 me-3">
                      <i className="bi bi-phone text-white"></i>
                    </div>
                    <div>
                      <h6 className="mb-0">Phone</h6>
                      <small className="text-muted">
                        +44 7769210752
                      </small>
                    </div>
                  </div>
                </div>

                <div className="social-links">
                  <a href="https://github.com/chukwumaOranu" target="_blank" rel="noopener noreferrer" className="me-3">
                    <i className="bi bi-github fs-4"></i>
                  </a>
                  <a href="https://www.linkedin.com/in/chukwuma-oranu-1a8a97257" target="_blank" rel="noopener noreferrer" className="me-3">
                    <i className="bi bi-linkedin fs-4"></i>
                  </a>
                </div>
              </div>
            </div>

            <div className="col-lg-8">
              <div className="card border-0 shadow-lg">
                <div className="card-body p-5">
                  <h3 className="mb-4">Send Me a Message</h3>

                  <form onSubmit={handleSubmit}>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label htmlFor="name" className="form-label">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          className={`form-control form-control-lg ${formErrors.name ? 'is-invalid' : ''}`}
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          disabled={loading}
                          placeholder="Enter your full name"
                        />
                        {formErrors.name && (
                          <div className="invalid-feedback">{formErrors.name}</div>
                        )}
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="email" className="form-label">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          className={`form-control form-control-lg ${formErrors.email ? 'is-invalid' : ''}`}
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          disabled={loading}
                          placeholder="Enter your email address"
                        />
                        {formErrors.email && (
                          <div className="invalid-feedback">{formErrors.email}</div>
                        )}
                      </div>
                      <div className="col-12">
                        <label htmlFor="subject" className="form-label">
                          Subject *
                        </label>
                        <input
                          type="text"
                          className={`form-control form-control-lg ${formErrors.subject ? 'is-invalid' : ''}`}
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          disabled={loading}
                          placeholder="What's this about?"
                        />
                        {formErrors.subject && (
                          <div className="invalid-feedback">{formErrors.subject}</div>
                        )}
                      </div>
                      <div className="col-12">
                        <label htmlFor="message" className="form-label">
                          Message *
                        </label>
                        <textarea
                          className={`form-control form-control-lg ${formErrors.message ? 'is-invalid' : ''}`}
                          id="message"
                          name="message"
                          rows={6}
                          value={formData.message}
                          onChange={handleChange}
                          required
                          disabled={loading}
                          placeholder="Tell me about your project or inquiry..."
                        ></textarea>
                        {formErrors.message && (
                          <div className="invalid-feedback">{formErrors.message}</div>
                        )}
                      </div>
                      <div className="col-12">
                        <button type="submit" className="btn btn-primary btn-lg px-5" disabled={loading}>
                          {loading ? (
                            <>
                              <span
                                className="spinner-border spinner-border-sm me-2"
                                role="status"
                                aria-hidden="true"
                              ></span>
                              Sending Message...
                            </>
                          ) : (
                            <>
                              Send Message <i className="bi bi-send ms-2"></i>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
        </div>
  )
} 