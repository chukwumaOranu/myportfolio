"use client"

import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchPublicProjects, selectPublicProjects, selectPublicProjectLoading } from "@/app/store/slices/projectCaseSlice"

export default function ProjectsClient() {
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
          {/* Featured Projects Section */}
          {isMounted && featuredProjects.length > 0 && (
            <section className="py-5 bg-white">
              <div className="container">
                <div className="row">
                  <div className="col-lg-8 mx-auto">
                    <div className="text-center mb-5">
                      <h2 className="display-5 fw-bold mb-4">Featured Projects</h2>
                      <p className="lead text-muted">
                        Highlighted work that showcases my expertise and creativity
                      </p>
                    </div>
                  </div>
                </div>
                <div className="row g-4">
                  {featuredProjects.slice(0, 3).map((project, index) => (
                    <div key={project.id} className="col-lg-4 col-md-6">
                      <div className="card border-0 shadow-sm h-100 project-card">
                        <div className="position-relative">
                          <Image
                            src={project.image || "/placeholder.svg?height=300&width=400"}
                            width={400}
                            height={300}
                            alt={project.title}
                            className="card-img-top"
                            style={{ objectFit: 'cover', height: '200px' }}
                          />
                          {project.featured && (
                            <div className="position-absolute top-0 end-0 m-2">
                              <span className="badge bg-warning text-dark">Featured</span>
                            </div>
                          )}
                        </div>
                        <div className="card-body d-flex flex-column">
                          <h5 className="card-title fw-bold">{project.title}</h5>
                          <p className="card-text text-muted flex-grow-1">
                            {project.description}
                          </p>
                          <div className="d-flex flex-wrap gap-2 mb-3">
                            {project.technologies && project.technologies.slice(0, 3).map((tech, techIndex) => (
                              <span key={techIndex} className="badge bg-light text-dark">
                                {tech}
                              </span>
                            ))}
                          </div>
                          <Link href={`/main/projects/${project.slug}`} className="btn btn-primary">
                            View Project <i className="bi bi-arrow-right ms-2"></i>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* All Projects Section */}
          <section className={`py-5 ${featuredProjects.length > 0 ? 'bg-light' : 'bg-white'}`}>
            <div className="container">
              <div className="row">
                <div className="col-lg-8 mx-auto">
                  <div className="text-center mb-5">
                    <h2 className="display-5 fw-bold mb-4">
                      {activeFilter === "All" ? "All Projects" : `${activeFilter} Projects`}
                    </h2>
                    <p className="lead text-muted">
                      {isMounted && filteredProjects.length > 0 
                        ? `Showing ${filteredProjects.length} project${filteredProjects.length !== 1 ? 's' : ''}`
                        : 'No projects found'
                      }
                    </p>
                  </div>
                </div>
              </div>
              
              {isMounted && filteredProjects.length > 0 ? (
                <div className="row g-4">
                  {filteredProjects.map((project) => (
                    <div key={project.id} className="col-lg-4 col-md-6">
                      <div className="card border-0 shadow-sm h-100 project-card">
                        <div className="position-relative">
                          <Image
                            src={project.image || "/placeholder.svg?height=300&width=400"}
                            width={400}
                            height={300}
                            alt={project.title}
                            className="card-img-top"
                            style={{ objectFit: 'cover', height: '200px' }}
                          />
                          {project.featured && (
                            <div className="position-absolute top-0 end-0 m-2">
                              <span className="badge bg-warning text-dark">Featured</span>
                            </div>
                          )}
                        </div>
                        <div className="card-body d-flex flex-column">
                          <h5 className="card-title fw-bold">{project.title}</h5>
                          <p className="card-text text-muted flex-grow-1">
                            {project.description}
                          </p>
                          <div className="d-flex flex-wrap gap-2 mb-3">
                            {project.technologies && project.technologies.slice(0, 3).map((tech, techIndex) => (
                              <span key={techIndex} className="badge bg-light text-dark">
                                {tech}
                              </span>
                            ))}
                          </div>
                          <Link href={`/main/projects/${project.slug}`} className="btn btn-primary">
                            View Project <i className="bi bi-arrow-right ms-2"></i>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="row">
                  <div className="col-lg-8 mx-auto text-center">
                    <div className="py-5">
                      <i className="bi bi-folder-x display-1 text-muted"></i>
                      <h3 className="mt-3">No projects found</h3>
                      <p className="text-muted">
                        {activeFilter === "All" 
                          ? "No projects are available at the moment."
                          : `No projects found in the "${activeFilter}" category.`
                        }
                      </p>
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
              <Link href="/main/contact" className="btn btn-outline-primary btn-lg px-5 py-3 fw-semibold">
                Start a Project <i className="bi bi-arrow-right ms-2"></i>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
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
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .project-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(0,0,0,0.15) !important;
        }
      `}</style>
    </div>
  )
} 