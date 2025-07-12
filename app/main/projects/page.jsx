"use client"

import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchPublicProjects, selectPublicProjects, selectPublicProjectLoading } from "@/app/store/slices/projectCaseSlice"

export default function ProjectsPage() {
  const dispatch = useDispatch()
  const projects = useSelector(selectPublicProjects)
  const loading = useSelector(selectPublicProjectLoading)
  const [activeFilter, setActiveFilter] = useState("All")
  const [isVisible, setIsVisible] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    setIsVisible(true)
    // Fetch public projects when component mounts
    dispatch(fetchPublicProjects())
  }, [dispatch])

  // Get unique categories from real projects
  const categories = isMounted && projects.length > 0 
    ? ["All", ...new Set(projects.map(project => project.category).filter(Boolean))]
    : ["All"]

  // Filter projects based on selected category
  const filteredProjects = isMounted && projects.length > 0
    ? activeFilter === "All" 
      ? projects 
      : projects.filter(project => project.category === activeFilter)
    : []

  // Get featured projects
  const featuredProjects = isMounted && projects.length > 0
    ? projects.filter(project => project.featured)
    : []

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
              <div className={`fade-in ${isVisible ? 'visible' : ''}`}>
                <h1 className="display-2 fw-bold mb-4 text-dark">My Projects</h1>
                <p className="lead fs-3 mb-4">A showcase of my recent work and technical achievements</p>
                <div className="d-flex flex-wrap justify-content-center gap-3">
                  <span className="badge bg-white text-primary fs-6 px-3 py-2">
                    {isMounted && projects.length > 0 ? `${projects.length} Projects` : 'Loading...'}
                  </span>
                  <span className="badge bg-white text-primary fs-6 px-3 py-2">
                    {isMounted && categories.length > 1 ? `${categories.length - 1} Categories` : 'Loading...'}
                  </span>
                  <span className="badge bg-white text-primary fs-6 px-3 py-2">Latest Tech</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      {isMounted && categories.length > 1 && (
        <section className="py-4 bg-white border-bottom">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 mx-auto">
                <div className="d-flex flex-wrap justify-content-center gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setActiveFilter(category)}
                      className={`btn ${activeFilter === category ? 'btn-primary' : 'btn-outline-primary'} px-4 py-2 rounded-pill`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {loading ? (
        <section className="py-5 bg-light">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 mx-auto text-center">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-3">Loading projects...</p>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <>
          {/* Featured Projects */}
          {isMounted && featuredProjects.length > 0 && activeFilter === "All" && (
            <section className="py-5 bg-light">
              <div className="container">
                <div className="row">
                  <div className="col-lg-8 mx-auto text-center mb-5">
                    <h2 className="display-6 fw-bold mb-3">Featured Projects</h2>
                    <p className="lead text-muted">My most recent and impactful work</p>
                  </div>
                </div>
                <div className="row g-4 mb-5">
                  {featuredProjects.map((project, index) => (
                    <div key={project.id} className="col-lg-6">
                      <div className={`featured-project-card ${isVisible ? 'visible' : ''}`} style={{ animationDelay: `${index * 0.2}s` }}>
                        <div className="card border-0 shadow-lg h-100 overflow-hidden">
                          <div className="position-relative">
                            <Image
                              src={project.image || "/placeholder.svg?height=400&width=600"}
                              width={600}
                              height={400}
                              alt={project.title}
                              className="card-img-top"
                            />
                            <div className="project-overlay">
                              <div className="project-overlay-content">
                                {project.demoLink && (
                                  <a
                                    href={project.demoLink}
                                    className="btn btn-light btn-sm me-2"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    <i className="bi bi-eye me-1"></i> Live Demo
                                  </a>
                                )}
                                {project.codeLink && (
                                  <a
                                    href={project.codeLink}
                                    className="btn btn-outline-light btn-sm"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    <i className="bi bi-github me-1"></i> Source Code
                                  </a>
                                )}
                              </div>
                            </div>
                            {project.featured && (
                              <div className="position-absolute top-0 start-0 m-3">
                                <span className="badge bg-warning text-dark">
                                  <i className="bi bi-star-fill me-1"></i> Featured
                                </span>
                              </div>
                            )}
                          </div>
                          <div className="card-body p-4">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                              {project.category && (
                                <span className="badge bg-primary">{project.category}</span>
                              )}
                              <small className="text-muted">
                                {new Date(project.created_at).getFullYear()}
                              </small>
                            </div>
                            <h3 className="card-title h4 mb-3">{project.title}</h3>
                            <p className="card-text text-muted mb-3">{project.description}</p>
                            {project.technologies && project.technologies.length > 0 && (
                              <div className="mb-3">
                                {project.technologies.slice(0, 4).map((tech, index) => (
                                  <span key={index} className="badge bg-light text-dark me-1 mb-1">
                                    {tech}
                                  </span>
                                ))}
                                {project.technologies.length > 4 && (
                                  <span className="badge bg-secondary text-white">
                                    +{project.technologies.length - 4} more
                                  </span>
                                )}
                              </div>
                            )}
                            <Link href={`${project.slug}`} className="btn btn-outline-primary">
                              View Details <i className="bi bi-arrow-right ms-1"></i>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* All Projects */}
          <section className={`py-5 ${activeFilter === "All" ? 'bg-white' : 'bg-light'}`}>
            <div className="container">
              {activeFilter !== "All" && (
                <div className="row mb-5">
                  <div className="col-lg-8 mx-auto text-center">
                    <h2 className="display-6 fw-bold mb-3">{activeFilter} Projects</h2>
                    <p className="lead text-muted">Filtered by {activeFilter.toLowerCase()} category</p>
                  </div>
                </div>
              )}
              
              {isMounted && filteredProjects.length > 0 ? (
                <div className="row g-4">
                  {filteredProjects.map((project, index) => (
                    <div key={project.id} className="col-lg-4 col-md-6">
                      <div className={`project-card ${isVisible ? 'visible' : ''}`} style={{ animationDelay: `${index * 0.1}s` }}>
                        <div className="card border-0 shadow-sm h-100 overflow-hidden">
                          <div className="position-relative">
                            <Image
                              src={project.image || "/placeholder.svg?height=400&width=600"}
                              width={400}
                              height={250}
                              alt={project.title}
                              className="card-img-top"
                            />
                            <div className="project-overlay">
                              <div className="project-overlay-content">
                                {project.demoLink && (
                                  <a
                                    href={project.demoLink}
                                    className="btn btn-light btn-sm me-2"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    <i className="bi bi-eye me-1"></i> Demo
                                  </a>
                                )}
                                {project.codeLink && (
                                  <a
                                    href={project.codeLink}
                                    className="btn btn-outline-light btn-sm"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    <i className="bi bi-github me-1"></i> Code
                                  </a>
                                )}
                              </div>
                            </div>
                            {project.featured && (
                              <div className="position-absolute top-0 start-0 m-3">
                                <span className="badge bg-warning text-dark">
                                  <i className="bi bi-star-fill me-1"></i> Featured
                                </span>
                              </div>
                            )}
                          </div>
                          <div className="card-body p-4">
                            <div className="d-flex justify-content-between align-items-center mb-2">
                              {project.category && (
                                <span className="badge bg-primary">{project.category}</span>
                              )}
                              <small className="text-muted">
                                {project.created_at ? 
                                  (() => {
                                    const date = new Date(project.created_at);
                                    return isNaN(date.getTime()) ? 'N/A' : date.getFullYear();
                                  })() 
                                  : 'N/A'
                                }
                              </small>
                            </div>
                            <h3 className="card-title h5 mb-3">{project.title}</h3>
                            <p className="card-text text-muted mb-3">{project.description}</p>
                            {project.technologies && project.technologies.length > 0 && (
                              <div className="mb-3">
                                {project.technologies.slice(0, 3).map((tech, index) => (
                                  <span key={index} className="badge bg-light text-dark me-1 mb-1">
                                    {tech}
                                  </span>
                                ))}
                                {project.technologies.length > 3 && (
                                  <span className="badge bg-secondary text-white">
                                    +{project.technologies.length - 3} more
                                  </span>
                                )}
                              </div>
                            )}
                            <a
                              href={project.slug}
                              className="btn btn-outline-primary"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              View Demo <i className="bi bi-arrow-right ms-1"></i>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="row">
                  <div className="col-lg-8 mx-auto text-center">
                    <div className="py-5">
                      <i className="bi bi-search display-1 text-muted mb-3"></i>
                      <h3 className="mb-3">
                        {isMounted && projects.length === 0 
                          ? "No projects available" 
                          : "No projects found"
                        }
                      </h3>
                      <p className="text-muted mb-4">
                        {isMounted && projects.length === 0 
                          ? "No projects have been added yet." 
                          : "No projects match the selected category."
                        }
                      </p>
                      {activeFilter !== "All" && (
                        <button 
                          onClick={() => setActiveFilter("All")}
                          className="btn btn-primary"
                        >
                          View All Projects
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>
        </>
      )}

      {/* Call to Action */}
      <section className="py-5 bg-gradient-primary text-dark">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto text-center">
              <h2 className="display-5 fw-bold mb-4">Have a Project in Mind?</h2>
              <p className="lead fs-4 mb-4">
                Let's work together to bring your ideas to life
              </p>
              <a href="/main/contact" className="btn btn-outline-primary btn-lg px-5 py-3 fw-semibold">
                Start a Project <i className="bi bi-arrow-right ms-2"></i>
              </a>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .text-gradient {
          background: linear-gradient(45deg, #ffffff, #e3f2fd);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .fade-in {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s ease-out;
        }
        
        .fade-in.visible {
          opacity: 1;
          transform: translateY(0);
        }
        
        .project-card {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.6s ease-out;
        }
        
        .project-card.visible {
          opacity: 1;
          transform: translateY(0);
        }
        
        .featured-project-card {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.6s ease-out;
        }
        
        .featured-project-card.visible {
          opacity: 1;
          transform: translateY(0);
        }
        
        .project-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        
        .card:hover .project-overlay {
          opacity: 1;
        }
        
        .project-overlay-content {
          text-align: center;
        }
        
        .card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15) !important;
        }
        
        .btn {
          transition: all 0.3s ease;
        }
        
        .btn:hover {
          transform: translateY(-2px);
        }
        
        .badge {
          transition: all 0.3s ease;
        }
        
        .badge:hover {
          transform: scale(1.05);
        }
      `}</style>
    </div>
  )
} 