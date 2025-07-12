"use client"

import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { 
  fetchTechnologies, 
  deleteTechnology, 
  selectTechnologies, 
  selectTechnologyLoading, 
  selectTechnologyError,
  clearError,
  clearSuccess 
} from "@/app/store/slices/technologySlice"
import { showSuccess, showError } from "@/utils/toast"

export default function TechnologiesPage() {
  const dispatch = useDispatch()
  const router = useRouter()
  const technologies = useSelector(selectTechnologies)
  const loading = useSelector(selectTechnologyLoading)
  const error = useSelector(selectTechnologyError)
  const [deleteId, setDeleteId] = useState(null)

  useEffect(() => {
    dispatch(fetchTechnologies())
  }, [dispatch])

  useEffect(() => {
    if (error) {
      showError(error.message || 'An error occurred')
      dispatch(clearError())
    }
  }, [error, dispatch])

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteTechnology(id)).unwrap()
      showSuccess('Technology deleted successfully')
      setDeleteId(null)
    } catch (error) {
      showError(error.message || 'Failed to delete technology')
    }
  }

  const handleEdit = (id) => {
    router.push(`/admin/dashboard/technologies/edit/${id}`)
  }

  if (loading) {
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

  return (
    <div className="container-fluid">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="h3 mb-0">Technologies Management</h1>
          <p className="text-muted">Manage your portfolio technologies</p>
        </div>
        <Link href="/admin/dashboard/technologies/add" className="btn btn-primary">
          <i className="bi bi-plus-circle me-2"></i>
          Add New Technology
        </Link>
      </div>

      {/* Technologies Grid */}
      <div className="row g-4">
        {technologies.length === 0 ? (
          <div className="col-12">
            <div className="text-center py-5">
              <i className="bi bi-code-slash display-1 text-muted"></i>
              <h4 className="mt-3">No Technologies Found</h4>
              <p className="text-muted">Get started by adding your first technology</p>
              <Link href="/admin/dashboard/technologies/add" className="btn btn-primary">
                <i className="bi bi-plus-circle me-2"></i>
                Add Technology
              </Link>
            </div>
          </div>
        ) : (
          technologies.map((technology) => (
            <div key={technology.id} className="col-md-6 col-lg-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body d-flex flex-column">
                  <div className="d-flex align-items-center mb-3">
                    <div className="bg-primary bg-opacity-10 rounded p-2 me-3">
                      <i className="bi bi-code-slash text-primary" style={{ fontSize: '1.5rem' }}></i>
                    </div>
                    <div>
                      <h5 className="card-title mb-1">{technology.name}</h5>
                      <p className="text-muted small mb-0">
                        {technology.projects_count || 0} projects
                      </p>
                    </div>
                  </div>
                  
                  {technology.description && (
                    <p className="card-text text-muted flex-grow-1">
                      {technology.description.length > 100 
                        ? `${technology.description.substring(0, 100)}...` 
                        : technology.description
                      }
                    </p>
                  )}

                  {/* Action Buttons */}
                  <div className="d-flex gap-2 mt-auto">
                    <button
                      onClick={() => handleEdit(technology.id)}
                      className="btn btn-outline-warning btn-sm flex-fill"
                    >
                      <i className="bi bi-pencil me-1"></i>
                      Edit
                    </button>
                    <button
                      onClick={() => setDeleteId(technology.id)}
                      className="btn btn-outline-danger btn-sm"
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Delete</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setDeleteId(null)}
                ></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete this technology? This action cannot be undone.</p>
                <p className="text-warning small">
                  <i className="bi bi-exclamation-triangle me-1"></i>
                  This will also remove the technology from all associated projects.
                </p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setDeleteId(null)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => handleDelete(deleteId)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show"></div>
        </div>
      )}
    </div>
  )
} 