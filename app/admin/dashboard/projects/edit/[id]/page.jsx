"use client"

import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { 
  fetchProjectById, 
  updateProject,
  selectCurrentProject, 
  selectProjectLoading, 
  selectProjectError,
  selectProjectSuccess,
  selectProjectMessage,
  clearError,
  clearSuccess,
  clearCurrentProject 
} from "@/app/store/slices/projectSlice"
import { 
  fetchTechnologies, 
  selectTechnologies 
} from "@/app/store/slices/technologySlice"
import { showSuccess, showError } from "@/utils/toast"

export default function EditProjectPage() {
  const dispatch = useDispatch()
  const router = useRouter()
  const { id } = useParams()
  const project = useSelector(selectCurrentProject)
  const loading = useSelector(selectProjectLoading)
  const error = useSelector(selectProjectError)
  const success = useSelector(selectProjectSuccess)
  const message = useSelector(selectProjectMessage)
  const technologies = useSelector(selectTechnologies)

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    slug: '',
    technologies: []
  })
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [currentImage, setCurrentImage] = useState(null)

  useEffect(() => {
    if (id) {
      dispatch(fetchProjectById(id))
    }
    dispatch(fetchTechnologies())
  }, [id, dispatch])

  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title || '',
        description: project.description || '',
        slug: project.slug || '',
        technologies: project.technologies ? 
          technologies.filter(tech => project.technologies.includes(tech.name)).map(tech => tech.id) : []
      })
      setCurrentImage(project.image)
    }
  }, [project, technologies])

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
      router.push('/admin/dashboard/projects')
    }
  }, [success, message, dispatch, router])

  useEffect(() => {
    return () => {
      dispatch(clearCurrentProject())
    }
  }, [dispatch])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))

    // Auto-generate slug from title
    if (name === 'title') {
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9 -]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim('-')
      setFormData(prev => ({
        ...prev,
        slug
      }))
    }
  }

  const handleTechnologyChange = (techId) => {
    setFormData(prev => ({
      ...prev,
      technologies: prev.technologies.includes(techId)
        ? prev.technologies.filter(id => id !== techId)
        : [...prev.technologies, techId]
    }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImageFile(file)
      
      // Create preview
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.title || !formData.description || !formData.slug) {
      showError('Please fill in all required fields')
      return
    }

    try {
      const projectData = new FormData()
      projectData.append('title', formData.title)
      projectData.append('description', formData.description)
      projectData.append('slug', formData.slug)
      projectData.append('technologies', JSON.stringify(formData.technologies))
      
      if (imageFile) {
        projectData.append('image', imageFile)
      } else if (currentImage) {
        projectData.append('image', currentImage)
      }

      await dispatch(updateProject({ id, projectData })).unwrap()
    } catch (error) {
      showError(error.message || 'Failed to update project')
    }
  }

  if (loading && !project) {
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
          <p className="text-muted">The project you're trying to edit doesn't exist.</p>
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
          <h1 className="h3 mb-0">Edit Project</h1>
          <p className="text-muted">Update project details</p>
        </div>
        <Link href="/admin/dashboard/projects" className="btn btn-outline-secondary">
          <i className="bi bi-arrow-left me-2"></i>
          Back to Projects
        </Link>
      </div>

      <div className="row">
        <div className="col-lg-8">
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                {/* Title */}
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Project Title *</label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                {/* Slug */}
                <div className="mb-3">
                  <label htmlFor="slug" className="form-label">Slug *</label>
                  <input
                    type="text"
                    className="form-control"
                    id="slug"
                    name="slug"
                    value={formData.slug}
                    onChange={handleInputChange}
                    required
                  />
                  <div className="form-text">URL-friendly version of the title</div>
                </div>

                {/* Description */}
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description *</label>
                  <textarea
                    className="form-control"
                    id="description"
                    name="description"
                    rows="5"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                  ></textarea>
                </div>

                {/* Technologies */}
                <div className="mb-3">
                  <label className="form-label">Technologies</label>
                  <div className="row g-2">
                    {technologies.map((tech) => (
                      <div key={tech.id} className="col-md-4 col-sm-6">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id={`tech-${tech.id}`}
                            checked={formData.technologies.includes(tech.id)}
                            onChange={() => handleTechnologyChange(tech.id)}
                          />
                          <label className="form-check-label" htmlFor={`tech-${tech.id}`}>
                            {tech.name}
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                  {technologies.length === 0 && (
                    <p className="text-muted small">No technologies available. Add some first.</p>
                  )}
                </div>

                {/* Current Image */}
                {currentImage && !imagePreview && (
                  <div className="mb-3">
                    <label className="form-label">Current Image</label>
                    <div className="position-relative" style={{ width: '300px', height: '200px' }}>
                      <Image
                        src={currentImage}
                        alt="Current"
                        fill
                        className="img-thumbnail"
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                  </div>
                )}

                {/* Image Upload */}
                <div className="mb-3">
                  <label htmlFor="image" className="form-label">Update Image</label>
                  <input
                    type="file"
                    className="form-control"
                    id="image"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                  <div className="form-text">Leave empty to keep current image. Recommended size: 600x400 pixels.</div>
                </div>

                {/* Image Preview */}
                {imagePreview && (
                  <div className="mb-3">
                    <label className="form-label">New Image Preview</label>
                    <div className="position-relative" style={{ width: '300px', height: '200px' }}>
                      <Image
                        src={imagePreview}
                        alt="Preview"
                        fill
                        className="img-thumbnail"
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                  </div>
                )}

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
                        Update Project
                      </>
                    )}
                  </button>
                  <Link href="/admin/dashboard/projects" className="btn btn-outline-secondary">
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
              <h5 className="card-title mb-0">Project Info</h5>
            </div>
            <div className="card-body">
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
              
              <div className="mb-3">
                <label className="form-label fw-bold">Current Technologies</label>
                <div className="d-flex flex-wrap gap-1">
                  {project.technologies && project.technologies.length > 0 ? (
                    project.technologies.map((tech, index) => (
                      <span key={index} className="badge bg-light text-dark small">
                        {tech}
                      </span>
                    ))
                  ) : (
                    <span className="text-muted small">None assigned</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 