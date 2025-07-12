"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchPublicProjects, selectPublicProjects, selectPublicProjectLoading } from "@/app/store/slices/projectCaseSlice"

export default function FeaturedProjects() {
  const dispatch = useDispatch()
  const projects = useSelector(selectPublicProjects)
  const loading = useSelector(selectPublicProjectLoading)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    // Fetch public projects when component mounts
    dispatch(fetchPublicProjects())
  }, [dispatch])

  // Get featured projects (first 3 projects)
  const featuredProjects = projects.slice(0, 3)

  return (
    <section className="py-5 bg-light">
      <div className="container">
        <div className="text-center mb-5">
          <span className="text-primary fw-semibold">Portfolio</span>
          <h2 className="display-5 fw-bold mt-2 mb-4">Featured Projects</h2>
          <p className="lead text-muted">Some of my recent work that showcases my skills and expertise</p>
        </div>

        {loading ? (
          <div className="row g-4 mb-5">
            {[1, 2, 3].map((index) => (
              <div key={index} className="col-lg-4">
                <div className="project-card bg-white rounded-3 shadow-lg overflow-hidden h-100">
                  <div className="project-image-container position-relative">
                    <div className="bg-light d-flex align-items-center justify-content-center" style={{ height: '250px' }}>
                      <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="skeleton-text mb-3" style={{ height: '24px', backgroundColor: '#e9ecef' }}></div>
                    <div className="skeleton-text mb-3" style={{ height: '16px', backgroundColor: '#e9ecef' }}></div>
                    <div className="skeleton-text mb-3" style={{ height: '16px', backgroundColor: '#e9ecef' }}></div>
                    <div className="d-flex flex-wrap gap-2">
                      {[1, 2, 3].map((techIndex) => (
                        <span key={techIndex} className="badge bg-light text-muted" style={{ width: '60px', height: '20px' }}></span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="row g-4 mb-5">
            {featuredProjects.map((project) => (
              <div key={project.id} className="col-lg-4">
                <div className="project-card bg-white rounded-3 shadow-lg overflow-hidden h-100">
                  <div className="project-image-container position-relative">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      width={400}
                      height={250}
                      alt={project.title}
                      className="project-image w-100"
                    />
                    <div className="project-overlay">
                      <a
                        href={project.slug}
                        className="btn btn-light"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Demo <i className="bi bi-arrow-right ms-2"></i>
                      </a>
                    </div>
                  </div>
                  <div className="p-4">
                    <h4 className="mb-3">{project.title}</h4>
                    <p className="text-muted mb-3">{project.description}</p>
                    <div className="d-flex flex-wrap gap-2">
                      {project.technologies && project.technologies.length > 0 ? (
                        project.technologies.slice(0, 3).map((tech, index) => (
                          <span key={index} className="badge bg-primary-soft text-primary">
                            {tech}
                          </span>
                        ))
                      ) : (
                        <span className="badge bg-light text-muted">No technologies</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-center">
          <Link href="/main/projects" className="btn btn-outline-primary btn-lg">
            View All Projects <i className="bi bi-arrow-right ms-2"></i>
          </Link>
        </div>
      </div>
    </section>
  )
} 