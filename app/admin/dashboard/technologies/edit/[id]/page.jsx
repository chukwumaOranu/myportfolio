"use client"

import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { 
  fetchTechnologyById, 
  updateTechnology,
  selectCurrentTechnology, 
  selectTechnologyLoading, 
  selectTechnologyError,
  selectTechnologySuccess,
  selectTechnologyMessage,
  clearError,
  clearSuccess,
  clearCurrentTechnology 
} from "../../../../../store/slices/technologySlice"
import { showSuccess, showError } from "@/utils/toast"

export default function EditTechnologyPage() {
  const dispatch = useDispatch()
  const router = useRouter()
  const { id } = useParams()
  const technology = useSelector(selectCurrentTechnology)
  const loading = useSelector(selectTechnologyLoading)
  const error = useSelector(selectTechnologyError)
  const success = useSelector(selectTechnologySuccess)
  const message = useSelector(selectTechnologyMessage)

  const [formData, setFormData] = useState({
    name: '',
    description: ''
  })

  useEffect(() => {
    if (id) {
      dispatch(fetchTechnologyById(id))
    }
  }, [id, dispatch])

  useEffect(() => {
    if (technology) {
      setFormData({
        name: technology.name || '',
        description: technology.description || ''
      })
    }
  }, [technology])

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

  useEffect(() => {
    return () => {
      dispatch(clearCurrentTechnology())
    }
  }, [dispatch])

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
      await dispatch(updateTechnology({ id, technologyData: formData })).unwrap()
    } catch (error) {
      showError(error.message || 'Failed to update technology')
    }
  }

  if (loading && !technology) {
    return (
      <div className="container-fluid">
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    )
  }

  if (!technology) {
    return (
      <div className="container-fluid">
        <div className="text-center py-5">
          <i className="bi bi-exclamation-triangle display-1 text-warning"></i>
          <h4 className="mt-3">Technology Not Found</h4>
          <p className="text-muted">The technology you're trying to edit doesn't exist.</p>
          <Link href="/admin/dashboard/technologies" className="btn btn-primary">
            Back to Technologies
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container-fluid">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="h3 mb-0">Edit Technology</h1>
          <p className="text-muted">Update technology details</p>
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
                    className="btn btn-warning"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                        Updating...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-check-circle me-2"></i>
                        Update Technology
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
              <h5 className="card-title mb-0">Technology Info</h5>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <label className="form-label fw-bold">Created</label>
                <p className="mb-0">
                  {new Date(technology.created_at).toLocaleDateString()}
                </p>
              </div>
              
              {technology.updated_at && (
                <div className="mb-3">
                  <label className="form-label fw-bold">Last Updated</label>
                  <p className="mb-0">
                    {new Date(technology.updated_at).toLocaleDateString()}
                  </p>
                </div>
              )}
              
              <div className="mb-3">
                <label className="form-label fw-bold">Projects Using This Technology</label>
                <p className="mb-0">
                  {technology.projects_count || 0} projects
                </p>
              </div>
            </div>
          </div>

          <div className="card mt-3">
            <div className="card-header">
              <h5 className="card-title mb-0">Current Details</h5>
            </div>
            <div className="card-body">
              <div className="mb-2">
                <strong>Name:</strong>
                <div className="text-muted">{technology.name}</div>
              </div>
              {technology.description && (
                <div>
                  <strong>Description:</strong>
                  <div className="text-muted">{technology.description}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 