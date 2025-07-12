"use client"

import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { 
  fetchProjectById, 
  selectCurrentProject, 
  selectProjectLoading, 
  selectProjectError,
  clearError,
  clearCurrentProject 
} from "@/app/store/slices/projectSlice"
import { showError } from "@/utils/toast"

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function ViewProjectPage() {
  const dispatch = useDispatch()
  const router = useRouter()
  const { id } = useParams()
  const project = useSelector(selectCurrentProject)
  const loading = useSelector(selectProjectLoading)
  const error = useSelector(selectProjectError)

  useEffect(() => {
    if (id) {
      console.log('ViewProjectPage: Fetching project with ID:', id)
      dispatch(fetchProjectById(id))
    }
  }, [id, dispatch])

  useEffect(() => {
    if (error) {
      console.log('ViewProjectPage: Error occurred:', error)
      showError(error.message || 'Project not found')
      dispatch(clearError())
      router.push('/admin/dashboard/projects')
    }
  }, [error, dispatch, router])

  useEffect(() => {
    return () => {
      dispatch(clearCurrentProject())
    }
  }, [dispatch])

  const handleEdit = () => {
    if (project) {
      router.push(`/admin/dashboard/projects/edit/${project.id}`)
    }
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

  if (!project) {
    return (
      <div className="container-fluid">
        <div className="text-center py-5">
          <i className="bi bi-exclamation-triangle display-1 text-warning"></i>
          <h4 className="mt-3">Project Not Found</h4>
          <p className="text-muted">The project you're looking for doesn't exist.</p>
          <Link href="/admin/dashboard/projects" className="btn btn-primary">
            Back to Projects
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
          <h1 className="h3 mb-0">{project.title}</h1>
          <p className="text-muted">Project Details</p>
        </div>
        <div className="d-flex gap-2">
          <button onClick={handleEdit} className="btn btn-warning">
            <i className="bi bi-pencil me-2"></i>
            Edit Project
          </button>
          <Link href="/admin/dashboard/projects" className="btn btn-outline-secondary">
            <i className="bi bi-arrow-left me-2"></i>
            Back to Projects
          </Link>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-8">
          {/* Project Image */}
          {project.image && (
            <div className="card mb-4">
              <div className="card-body p-0">
                <div className="position-relative" style={{ height: '400px' }}>
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="card-img-top"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Project Description */}
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="card-title mb-0">Description</h5>
            </div>
            <div className="card-body">
              <p className="card-text">{project.description}</p>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          {/* Project Details */}
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="card-title mb-0">Project Details</h5>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <label className="form-label fw-bold">Title</label>
                <p className="mb-0">{project.title}</p>
              </div>
              
              <div className="mb-3">
                <label className="form-label fw-bold">Slug</label>
                <p className="mb-0">
                  <code>{project.slug}</code>
                </p>
              </div>
              
              <div className="mb-3">
                <label className="form-label fw-bold">Created</label>
                <p className="mb-0">
                  {new Date(project.created_at).toLocaleDateString()}
                </p>
              </div>
              
              {project.updated_at && (
                <div className="mb-3">
                  <label className="form-label fw-bold">Last Updated</label>
                  <p className="mb-0">
                    {new Date(project.updated_at).toLocaleDateString()}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Technologies */}
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">Technologies</h5>
            </div>
            <div className="card-body">
              {project.technologies && project.technologies.length > 0 ? (
                <div className="d-flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="badge bg-primary">
                      {tech}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-muted mb-0">No technologies assigned</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-4 pt-4 border-top">
        <div className="d-flex gap-2">
          <button onClick={handleEdit} className="btn btn-warning">
            <i className="bi bi-pencil me-2"></i>
            Edit Project
          </button>
          <Link href="/admin/dashboard/projects" className="btn btn-outline-secondary">
            <i className="bi bi-arrow-left me-2"></i>
            Back to Projects
          </Link>
        </div>
      </div>
    </div>
  )
} 