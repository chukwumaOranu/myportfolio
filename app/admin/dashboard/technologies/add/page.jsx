"use client"

import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { 
  createTechnology, 
  selectTechnologyLoading, 
  selectTechnologyError,
  selectTechnologySuccess,
  selectTechnologyMessage,
  clearError,
  clearSuccess 
} from "@/app/store/slices/technologySlice"
import { showSuccess, showError } from "@/utils/toast"

export default function AddTechnologyPage() {
  const dispatch = useDispatch()
  const router = useRouter()
  const loading = useSelector(selectTechnologyLoading)
  const error = useSelector(selectTechnologyError)
  const success = useSelector(selectTechnologySuccess)
  const message = useSelector(selectTechnologyMessage)

  const [formData, setFormData] = useState({
    name: '',
    description: ''
  })

  useEffect(() => {
    if (error) {
      showError(error.message || 'An error occurred')
      dispatch(clearError())
    }
  }, [error, dispatch])

  useEffect(() => {
    if (success) {
      showSuccess(message)
      dispatch(clearSuccess())
      router.push('/admin/dashboard/technologies')
    }
  }, [success, message, dispatch, router])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.name) {
      showError('Please enter a technology name')
      return
    }

    try {
      await dispatch(createTechnology(formData)).unwrap()
    } catch (error) {
      showError(error.message || 'Failed to create technology')
    }
  }

  return (
    <div className="container-fluid">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="h3 mb-0">Add New Technology</h1>
          <p className="text-muted">Create a new technology for your portfolio</p>
        </div>
        <Link href="/admin/dashboard/technologies" className="btn btn-outline-secondary">
          <i className="bi bi-arrow-left me-2"></i>
          Back to Technologies
        </Link>
      </div>

      <div className="row">
        <div className="col-lg-8">
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                {/* Name */}
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Technology Name *</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g., React, Node.js, Python"
                    required
                  />
                </div>

                {/* Description */}
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    id="description"
                    name="description"
                    rows="4"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Brief description of the technology..."
                  ></textarea>
                  <div className="form-text">Optional: Add a brief description of the technology</div>
                </div>

                {/* Submit Button */}
                <div className="d-flex gap-2">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                        Creating...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-plus-circle me-2"></i>
                        Create Technology
                      </>
                    )}
                  </button>
                  <Link href="/admin/dashboard/technologies" className="btn btn-outline-secondary">
                    Cancel
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="col-lg-4">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">Technology Guidelines</h5>
            </div>
            <div className="card-body">
              <ul className="list-unstyled mb-0">
                <li className="mb-2">
                  <i className="bi bi-check-circle text-success me-2"></i>
                  Use clear, recognizable names
                </li>
                <li className="mb-2">
                  <i className="bi bi-check-circle text-success me-2"></i>
                  Include popular frameworks
                </li>
                <li className="mb-2">
                  <i className="bi bi-check-circle text-success me-2"></i>
                  Add programming languages
                </li>
                <li className="mb-2">
                  <i className="bi bi-check-circle text-success me-2"></i>
                  Include tools and databases
                </li>
                <li>
                  <i className="bi bi-check-circle text-success me-2"></i>
                  Keep descriptions concise
                </li>
              </ul>
            </div>
          </div>

          <div className="card mt-3">
            <div className="card-header">
              <h5 className="card-title mb-0">Examples</h5>
            </div>
            <div className="card-body">
              <div className="mb-2">
                <strong>Frontend:</strong>
                <div className="small text-muted">React, Vue.js, Angular, TypeScript</div>
              </div>
              <div className="mb-2">
                <strong>Backend:</strong>
                <div className="small text-muted">Node.js, Python, Java, PHP</div>
              </div>
              <div className="mb-2">
                <strong>Database:</strong>
                <div className="small text-muted">MySQL, MongoDB, PostgreSQL</div>
              </div>
              <div>
                <strong>Tools:</strong>
                <div className="small text-muted">Docker, Git, AWS, Firebase</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 