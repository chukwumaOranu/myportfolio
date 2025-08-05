"use client"

import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { submitContactForm, clearContactState } from "@/app/store/slices/contactSlice"
import { fetchPublicProfile, selectPublicProfile } from "@/app/store/slices/profileCaseSlice"
import { showSuccess, showError } from "@/utils/toast"

export default function ContactClient() {
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
    
    // Submit the form
    dispatch(submitContactForm(formData))
  }

  return (
    <div className="page-top-spacing">
      {/* Hero Section */}
      <section className="py-5 bg-gradient-primary text-dark position-relative overflow-hidden">
        <div className="position-absolute top-0 start-0 w-100 h-100 opacity-10">
          <div className="position-absolute top-0 start-0 w-100 h-100" style={{ background: 'linear-gradient(45deg, rgba(0, 123, 255, 0.1), rgba(0, 212, 255, 0.1))' }}></div>
        </div>
        <div className="container position-relative">
          <div className="row">
            <div className="col-lg-8 mx-auto text-center">
              <h1 className="display-2 fw-bold mb-4 text-dark">Get In Touch</h1>
              <p className="lead fs-3 mb-4">Let's discuss your next project or just say hello</p>
              <div className="d-flex flex-wrap justify-content-center gap-3">
                <span className="badge bg-white text-primary fs-6 px-3 py-2">
                  <i className="bi bi-envelope me-2"></i>
                  Available for Freelance
                </span>
                <span className="badge bg-white text-primary fs-6 px-3 py-2">
                  <i className="bi bi-clock me-2"></i>
                  Quick Response
                </span>
                <span className="badge bg-white text-primary fs-6 px-3 py-2">
                  <i className="bi bi-geo-alt me-2"></i>
                  Remote Work
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-5 bg-white">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto">
              <div className="card border-0 shadow-lg">
                <div className="card-body p-5">
                  <div className="text-center mb-5">
                    <h2 className="display-5 fw-bold mb-4">Send Me a Message</h2>
                    <p className="lead text-muted">
                      I'm always interested in new opportunities and collaborations
                    </p>
                  </div>

                  <form onSubmit={handleSubmit}>
                    <div className="row g-4">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="name" className="form-label fw-semibold">
                            Full Name <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className={`form-control form-control-lg ${formErrors.name ? 'is-invalid' : ''}`}
                            placeholder="Your full name"
                          />
                          {formErrors.name && (
                            <div className="invalid-feedback">{formErrors.name}</div>
                          )}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="email" className="form-label fw-semibold">
                            Email Address <span className="text-danger">*</span>
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`form-control form-control-lg ${formErrors.email ? 'is-invalid' : ''}`}
                            placeholder="your.email@example.com"
                          />
                          {formErrors.email && (
                            <div className="invalid-feedback">{formErrors.email}</div>
                          )}
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-group">
                          <label htmlFor="subject" className="form-label fw-semibold">
                            Subject <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            className={`form-control form-control-lg ${formErrors.subject ? 'is-invalid' : ''}`}
                            placeholder="What's this about?"
                          />
                          {formErrors.subject && (
                            <div className="invalid-feedback">{formErrors.subject}</div>
                          )}
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-group">
                          <label htmlFor="message" className="form-label fw-semibold">
                            Message <span className="text-danger">*</span>
                          </label>
                          <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            rows="6"
                            className={`form-control form-control-lg ${formErrors.message ? 'is-invalid' : ''}`}
                            placeholder="Tell me about your project or inquiry..."
                          ></textarea>
                          {formErrors.message && (
                            <div className="invalid-feedback">{formErrors.message}</div>
                          )}
                        </div>
                      </div>
                      <div className="col-12">
                        <button
                          type="submit"
                          disabled={loading}
                          className="btn btn-primary btn-lg px-5 py-3 fw-semibold w-100"
                        >
                          {loading ? (
                            <>
                              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                              Sending Message...
                            </>
                          ) : (
                            <>
                              <i className="bi bi-send me-2"></i>
                              Send Message
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

      {/* Contact Information Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto">
              <div className="text-center mb-5">
                <h2 className="display-5 fw-bold mb-4">Other Ways to Connect</h2>
                <p className="lead text-muted">
                  Prefer a different method? Here are other ways to reach me
                </p>
              </div>
            </div>
          </div>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card border-0 bg-white shadow-sm h-100 text-center">
                <div className="card-body p-4">
                  <div className="bg-primary rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '60px', height: '60px' }}>
                    <i className="bi bi-envelope text-white fs-4"></i>
                  </div>
                  <h5 className="card-title fw-bold">Email</h5>
                  <p className="card-text text-muted">
                    {isMounted && profile && profile.email ? profile.email : 'contact@oranuchukwuma.co.uk'}
                  </p>
                  <a href={`mailto:${isMounted && profile && profile.email ? profile.email : 'contact@oranuchukwuma.co.uk'}`} className="btn btn-outline-primary">
                    Send Email
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card border-0 bg-white shadow-sm h-100 text-center">
                <div className="card-body p-4">
                  <div className="bg-success rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '60px', height: '60px' }}>
                    <i className="bi bi-linkedin text-white fs-4"></i>
                  </div>
                  <h5 className="card-title fw-bold">LinkedIn</h5>
                  <p className="card-text text-muted">
                    Connect with me professionally
                  </p>
                  <a href="https://linkedin.com/in/oranuchukwuma" target="_blank" rel="noopener noreferrer" className="btn btn-outline-success">
                    Connect
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card border-0 bg-white shadow-sm h-100 text-center">
                <div className="card-body p-4">
                  <div className="bg-dark rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '60px', height: '60px' }}>
                    <i className="bi bi-github text-white fs-4"></i>
                  </div>
                  <h5 className="card-title fw-bold">GitHub</h5>
                  <p className="card-text text-muted">
                    Check out my code and projects
                  </p>
                  <a href="https://github.com/oranuchukwuma" target="_blank" rel="noopener noreferrer" className="btn btn-outline-dark">
                    View Profile
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-5 bg-gradient-primary text-dark">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto text-center">
              <h2 className="display-5 fw-bold mb-4">Ready to Start a Project?</h2>
              <p className="lead fs-4 mb-4">
                Let's discuss your ideas and bring them to life together
              </p>
              <a href="#contact-form" className="btn btn-outline-primary btn-lg px-5 py-3 fw-semibold">
                Get Started <i className="bi bi-arrow-right ms-2"></i>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 