"use client"

import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { 
  fetchProjects, 
  deleteProject, 
  selectProjects, 
  selectProjectLoading, 
  selectProjectError,
  clearError,
  clearSuccess 
} from "@/app/store/slices/projectSlice"
import { showSuccess, showError } from "@/utils/toast"

export default function ProjectsPage() {
  const dispatch = useDispatch()
  const router = useRouter()
  const projects = useSelector(selectProjects)
  const loading = useSelector(selectProjectLoading)
  const error = useSelector(selectProjectError)
  const [deleteId, setDeleteId] = useState(null)

  useEffect(() => {
    dispatch(fetchProjects())
  }, [dispatch])

  useEffect(() => {
    if (error) {
      showError(error.message || 'An error occurred')
      dispatch(clearError())
    }
  }, [error, dispatch])

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteProject(id)).unwrap()
      showSuccess('Project deleted successfully')
      setDeleteId(null)
    } catch (error) {
      showError(error.message || 'Failed to delete project')
    }
  }

  const handleView = (id) => {
    console.log('View button clicked with ID:', id)
    console.log('Navigating to:', `/admin/dashboard/projects/${id}`)
    router.push(`/admin/dashboard/projects/${id}`)
  }

  const handleEdit = (id) => {
    router.push(`/admin/dashboard/projects/edit/${id}`)
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
          <h1 className="h3 mb-0">Projects Management</h1>
          <p className="text-muted">Manage your portfolio projects</p>
        </div>
        <Link href="/admin/dashboard/projects/add" className="btn btn-primary">
          <i className="bi bi-plus-circle me-2"></i>
          Add New Project
        </Link>
      </div>

      {/* Projects Grid */}
      <div className="row g-4">
        {projects.length === 0 ? (
          <div className="col-12">
            <div className="text-center py-5">
              <i className="bi bi-folder-x display-1 text-muted"></i>
              <h4 className="mt-3">No Projects Found</h4>
              <p className="text-muted">Get started by adding your first project</p>
              <Link href="/admin/dashboard/projects/add" className="btn btn-primary">
                <i className="bi bi-plus-circle me-2"></i>
                Add Project
              </Link>
            </div>
          </div>
        ) : (
          projects.map((project) => (
            <div key={project.id} className="col-md-6 col-lg-4">
              <div className="card h-100 shadow-sm">
                {/* Project Image */}
                <div className="position-relative" style={{ height: '200px' }}>
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="card-img-top"
                      style={{ objectFit: 'cover' }}
                    />
                  ) : (
                    <div className="bg-light d-flex align-items-center justify-content-center h-100">
                      <i className="bi bi-image text-muted" style={{ fontSize: '3rem' }}></i>
                    </div>
                  )}
                  <div className="position-absolute top-0 end-0 m-2">
                    <span className="badge bg-primary">{project.technologies?.length || 0} tech</span>
                  </div>
                </div>

                {/* Project Content */}
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title mb-2">{project.title}</h5>
                  <p className="card-text text-muted flex-grow-1">
                    {project.description.length > 100 
                      ? `${project.description.substring(0, 100)}...` 
                      : project.description
                    }
                  </p>
                  
                  {/* Technologies */}
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="mb-3">
                      <div className="d-flex flex-wrap gap-1">
                        {project.technologies.slice(0, 3).map((tech, index) => (
                          <span key={index} className="badge bg-light text-dark small">
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 3 && (
                          <span className="badge bg-light text-dark small">
                            +{project.technologies.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="d-flex gap-2 mt-auto">
                    <button
                      onClick={() => handleView(project.id)}
                      className="btn btn-outline-primary btn-sm flex-fill"
                    >
                      <i className="bi bi-eye me-1"></i>
                      View
                    </button>
                    <button
                      onClick={() => handleEdit(project.id)}
                      className="btn btn-outline-warning btn-sm flex-fill"
                    >
                      <i className="bi bi-pencil me-1"></i>
                      Edit
                    </button>
                    <button
                      onClick={() => setDeleteId(project.id)}
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
                <p>Are you sure you want to delete this project? This action cannot be undone.</p>
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