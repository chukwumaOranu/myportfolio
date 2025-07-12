"use client"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchPublicTechnologies, selectPublicTechnologies, selectPublicTechnologyLoading } from "@/app/store/slices/technologyCaseSlice"

export default function Skills() {
  const dispatch = useDispatch()
  const technologies = useSelector(selectPublicTechnologies)
  const loading = useSelector(selectPublicTechnologyLoading)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    // Fetch public technologies when component mounts
    dispatch(fetchPublicTechnologies())
  }, [dispatch])

  // Helper function to get icon for technology
  const getTechnologyIcon = (techName) => {
    const iconMap = {
      'HTML5': 'bi bi-filetype-html',
      'CSS3': 'bi bi-filetype-css',
      'JavaScript': 'bi bi-filetype-js',
      'React': 'bi bi-code-slash',
      'Next.js': 'bi bi-code-square',
      'Bootstrap': 'bi bi-bootstrap',
      'Tailwind CSS': 'bi bi-palette',
      'Node.js': 'bi bi-server',
      'Express': 'bi bi-diagram-3',
      'Python': 'bi bi-filetype-py',
      'Django': 'bi bi-bricks',
      'MongoDB': 'bi bi-database',
      'PostgreSQL': 'bi bi-database-fill',
      'REST API': 'bi bi-arrow-left-right',
      'Git': 'bi bi-git',
      'GitHub': 'bi bi-github',
      'Docker': 'bi bi-box-seam',
      'AWS': 'bi bi-cloud',
      'Vercel': 'bi bi-triangle',
      'VS Code': 'bi bi-code',
      'Figma': 'bi bi-vector-pen',
      'PHP': 'bi bi-filetype-php',
      'Angular': 'bi bi-filetype-tsx',
      'Vue.js': 'bi bi-filetype-tsx',
      'TypeScript': 'bi bi-filetype-ts',
      'GraphQL': 'bi bi-diagram-2',
      'Netlify': 'bi bi-globe',
    }
    return iconMap[techName] || 'bi bi-code-slash'
  }

  // Map technologies from state to skill objects
  const mapTechnologiesToSkills = (techList) => {
    return techList.map(tech => ({
      name: tech.name,
      icon: getTechnologyIcon(tech.name)
    }))
  }

  // Get skills from real state data
  const frontendSkills = isMounted && technologies.length > 0 
    ? mapTechnologiesToSkills(technologies.filter(tech => ['HTML5', 'CSS3', 'JavaScript', 'React', 'Next.js', 'Bootstrap', 'Tailwind CSS', 'Vue.js', 'Angular', 'TypeScript'].includes(tech.name)))
    : []

  const backendSkills = isMounted && technologies.length > 0
    ? mapTechnologiesToSkills(technologies.filter(tech => ['Node.js', 'Express', 'Python', 'Django', 'MongoDB', 'PostgreSQL', 'REST API', 'GraphQL', 'PHP'].includes(tech.name)))
    : []

  const toolsSkills = isMounted && technologies.length > 0
    ? mapTechnologiesToSkills(technologies.filter(tech => ['Git', 'GitHub', 'Docker', 'AWS', 'Vercel', 'VS Code', 'Figma', 'Netlify'].includes(tech.name)))
    : []

  return (
    <section id="skills" className="bg-light">
      <div className="container">
        <div className="section-title">
          <h2>My Skills</h2>
        </div>

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3">Loading skills...</p>
          </div>
        ) : (
          <>
            {frontendSkills.length > 0 && (
        <div className="row mb-5">
          <div className="col-12">
            <h3 className="text-center mb-4">Frontend Development</h3>
            <div className="row justify-content-center">
              {frontendSkills.map((skill, index) => (
                <div key={index} className="col-6 col-md-3 mb-4">
                  <div className="card h-100 border-0 text-center p-4">
                    <div className="card-body">
                      <i className={`${skill.icon} skill-icon text-primary`}></i>
                      <h4 className="h5">{skill.name}</h4>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
            )}

            {backendSkills.length > 0 && (
        <div className="row mb-5">
          <div className="col-12">
            <h3 className="text-center mb-4">Backend Development</h3>
            <div className="row justify-content-center">
              {backendSkills.map((skill, index) => (
                <div key={index} className="col-6 col-md-3 mb-4">
                  <div className="card h-100 border-0 text-center p-4">
                    <div className="card-body">
                      <i className={`${skill.icon} skill-icon text-primary`}></i>
                      <h4 className="h5">{skill.name}</h4>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
            )}

            {toolsSkills.length > 0 && (
        <div className="row">
          <div className="col-12">
            <h3 className="text-center mb-4">Tools & Technologies</h3>
            <div className="row justify-content-center">
              {toolsSkills.map((skill, index) => (
                <div key={index} className="col-6 col-md-3 mb-4">
                  <div className="card h-100 border-0 text-center p-4">
                    <div className="card-body">
                      <i className={`${skill.icon} skill-icon text-primary`}></i>
                      <h4 className="h5">{skill.name}</h4>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
            )}

            {!loading && technologies.length === 0 && (
              <div className="text-center py-5">
                <p>No skills available at the moment.</p>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  )
} 