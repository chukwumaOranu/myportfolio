"use client"

import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { 
  createProject, 
  selectProjectLoading, 
  selectProjectError,
  selectProjectSuccess,
  selectProjectMessage,
  clearError,
  clearSuccess 
} from "@/app/store/slices/projectSlice"
import { 
  fetchTechnologies, 
  selectTechnologies 
} from "@/app/store/slices/technologySlice"
import { showSuccess, showError } from "@/utils/toast"

export default function AddProjectPage() {
  const dispatch = useDispatch()
  const router = useRouter()
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

  useEffect(() => {
    dispatch(fetchTechnologies())
  }, [dispatch])

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
      }

      await dispatch(createProject(projectData)).unwrap()
    } catch (error) {
      showError(error.message || 'Failed to create project')
    }
  }

  return (
    <div className="container-fluid">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="h3 mb-0">Add New Project</h1>
          <p className="text-muted">Create a new portfolio project</p>
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

                {/* Image Upload */}
                <div className="mb-3">
                  <label htmlFor="image" className="form-label">Project Image</label>
                  <input
                    type="file"
                    className="form-control"
                    id="image"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                  <div className="form-text">Recommended size: 600x400 pixels. Will be automatically resized.</div>
                </div>

                {/* Image Preview */}
                {imagePreview && (
                  <div className="mb-3">
                    <label className="form-label">Image Preview</label>
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
                        Create Project
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
              <h5 className="card-title mb-0">Project Guidelines</h5>
            </div>
            <div className="card-body">
              <ul className="list-unstyled mb-0">
                <li className="mb-2">
                  <i className="bi bi-check-circle text-success me-2"></i>
                  Use descriptive titles
                </li>
                <li className="mb-2">
                  <i className="bi bi-check-circle text-success me-2"></i>
                  Write detailed descriptions
                </li>
                <li className="mb-2">
                  <i className="bi bi-check-circle text-success me-2"></i>
                  Select relevant technologies
                </li>
                <li className="mb-2">
                  <i className="bi bi-check-circle text-success me-2"></i>
                  Upload high-quality images
                </li>
                <li>
                  <i className="bi bi-check-circle text-success me-2"></i>
                  Use SEO-friendly slugs
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 