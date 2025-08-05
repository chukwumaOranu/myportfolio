"use client"

import { useState, useEffect } from "react"

export default function SkillsClient() {
  const [activeCategory, setActiveCategory] = useState("Frontend")
  const [isVisible, setIsVisible] = useState(false)
  const [animatedSkills, setAnimatedSkills] = useState({})

  useEffect(() => {
    setIsVisible(true)
    // Animate skills after a delay
    setTimeout(() => {
      setAnimatedSkills({
        React: true,
        "Next.js": true,
        Bootstrap: true,
        JavaScript: true,
        "HTML5/CSS3": true,
        "Tailwind CSS": true,
        "Node.js": true,
        "Express.js": true,
        Python: true,
        MySQL: true,
        PostgreSQL: true,
        GraphQL: true,
        Git: true,
        "CI/CD": true,
      })
    }, 500)
  }, [])

  const skillCategories = [
    {
      id: "Frontend",
      title: "Frontend Development",
      color: "#007bff",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      skills: [
        { name: "React", level: 95, icon: "bi-code-slash", color: "#61DAFB" },
        { name: "Next.js", level: 90, icon: "bi-code-square", color: "#000000" },
        { name: "Bootstrap", level: 88, icon: "bi-bootstrap", color: "#7952B3" },
        { name: "JavaScript", level: 95, icon: "bi-filetype-js", color: "#F7DF1E" },
        { name: "HTML5/CSS3", level: 92, icon: "bi-filetype-html", color: "#E34F26" },
        { name: "Tailwind CSS", level: 85, icon: "bi-palette", color: "#06B6D4" },
      ],
    },
    {
      id: "Backend",
      title: "Backend Development",
      color: "#28a745",
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      skills: [
        { name: "Node.js", level: 90, icon: "bi-server", color: "#339933" },
        { name: "Express.js", level: 88, icon: "bi-diagram-3", color: "#000000" },
        { name: "Python", level: 80, icon: "bi-filetype-py", color: "#3776AB" },
        { name: "MySQL", level: 85, icon: "bi-database", color: "#47A248" },
        { name: "PostgreSQL", level: 82, icon: "bi-database-fill", color: "#336791" },
        { name: "GraphQL", level: 78, icon: "bi-diagram-2", color: "#E10098" },
      ],
    },
    {
      id: "DevOps",
      title: "DevOps & Tools",
      color: "#ffc107",
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      skills: [
        { name: "Git", level: 95, icon: "bi-git", color: "#F05032" },
        { name: "CI/CD", level: 82, icon: "bi-arrow-repeat", color: "#FF6B6B" },
      ],
    },
  ]

  const certifications = [
    {
      title: "Full Stack Development",
      subtitle: "IT Career Switch UK",
      icon: "bi-award",
      color: "#FF9900",
      year: "2024"
    },
    {
      title: "Public Administration",
      subtitle: "Bachelor's Degree",
      icon: "bi-mortarboard",
      color: "#28a745",
      year: "2007"
    },
    {
      title: "Continuous Learning",
      subtitle: "Always staying updated",
      icon: "bi-book",
      color: "#17a2b8",
      year: "2008 - 2023"
    }
  ]

  const currentCategory = skillCategories.find(cat => cat.id === activeCategory)

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
                <h1 className="display-2 fw-bold mb-4 text-dark">Skills & Technologies</h1>
                <p className="lead fs-3 mb-4">Comprehensive overview of my technical expertise and tools</p>
                <div className="d-flex flex-wrap justify-content-center gap-3">
                  <span className="badge bg-white text-primary fs-6 px-3 py-2">
                    <i className="bi bi-code-slash me-2"></i>
                    Full Stack
                  </span>
                  <span className="badge bg-white text-primary fs-6 px-3 py-2">
                    <i className="bi bi-lightning me-2"></i>
                    Modern Tech
                  </span>
                  <span className="badge bg-white text-primary fs-6 px-3 py-2">
                    <i className="bi bi-graph-up me-2"></i>
                    Always Learning
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Categories Section */}
      <section className="py-5 bg-white">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto">
              <div className="text-center mb-5">
                <h2 className="display-5 fw-bold mb-4">Technical Skills</h2>
                <p className="lead text-muted">
                  My expertise spans across multiple domains of software development
                </p>
              </div>

              {/* Category Tabs */}
              <div className="d-flex flex-wrap justify-content-center gap-2 mb-5">
                {skillCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`btn ${activeCategory === category.id ? 'btn-primary' : 'btn-outline-primary'} px-4 py-2 rounded-pill`}
                    style={{
                      background: activeCategory === category.id ? category.gradient : 'transparent',
                      border: activeCategory === category.id ? 'none' : undefined
                    }}
                  >
                    {category.title}
                  </button>
                ))}
              </div>

              {/* Skills Grid */}
              <div className="row g-4">
                {currentCategory?.skills.map((skill, index) => (
                  <div key={skill.name} className="col-md-6">
                    <div className="skill-card">
                      <div className="d-flex align-items-center mb-3">
                        <div 
                          className="skill-icon me-3"
                          style={{ 
                            backgroundColor: skill.color,
                            width: '50px',
                            height: '50px',
                            borderRadius: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          <i className={`bi ${skill.icon} text-white fs-5`}></i>
                        </div>
                        <div className="flex-grow-1">
                          <h5 className="mb-1 fw-bold">{skill.name}</h5>
                          <div className="d-flex justify-content-between align-items-center">
                            <div className="progress flex-grow-1 me-3" style={{ height: "8px" }}>
                              <div 
                                className="progress-bar" 
                                style={{ 
                                  width: animatedSkills[skill.name] ? `${skill.level}%` : '0%',
                                  backgroundColor: skill.color,
                                  transition: "width 1.5s ease-in-out"
                                }}
                              ></div>
                            </div>
                            <span className="fw-semibold text-muted">{skill.level}%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto">
              <div className="text-center mb-5">
                <h2 className="display-5 fw-bold mb-4">Certifications & Education</h2>
                <p className="lead text-muted">
                  Formal education and continuous learning achievements
                </p>
              </div>

              <div className="row g-4">
                {certifications.map((cert, index) => (
                  <div key={index} className="col-md-4">
                    <div className="card border-0 bg-white shadow-sm h-100 text-center">
                      <div className="card-body p-4">
                        <div 
                          className="rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
                          style={{ 
                            width: '80px', 
                            height: '80px',
                            backgroundColor: cert.color
                          }}
                        >
                          <i className={`bi ${cert.icon} text-white fs-2`}></i>
                        </div>
                        <h5 className="card-title fw-bold">{cert.title}</h5>
                        <p className="card-text text-muted mb-2">{cert.subtitle}</p>
                        <span className="badge bg-light text-dark">{cert.year}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Journey Section */}
      <section className="py-5 bg-white">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto">
              <div className="text-center mb-5">
                <h2 className="display-5 fw-bold mb-4">My Learning Journey</h2>
                <p className="lead text-muted">
                  How I've evolved as a developer over the years
                </p>
              </div>

              <div className="timeline-container">
                <div className="timeline-item left">
                  <div className="timeline-content">
                    <div className="card border-0 shadow-sm">
                      <div className="card-body p-4">
                        <div className="d-flex align-items-center mb-3">
                          <div className="bg-primary rounded-circle p-3 me-3">
                            <i className="bi bi-code-slash text-white fs-4"></i>
                          </div>
                          <div>
                            <h4 className="mb-1">Started with HTML/CSS</h4>
                            <p className="text-primary mb-0 fw-semibold">2015 - 2016</p>
                          </div>
                        </div>
                        <p className="text-muted mb-0">
                          Began my journey with the fundamentals of web development, learning HTML, CSS, and basic JavaScript.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="timeline-item right">
                  <div className="timeline-content">
                    <div className="card border-0 shadow-sm">
                      <div className="card-body p-4">
                        <div className="d-flex align-items-center mb-3">
                          <div className="bg-success rounded-circle p-3 me-3">
                            <i className="bi bi-server text-white fs-4"></i>
                          </div>
                          <div>
                            <h4 className="mb-1">Backend Development</h4>
                            <p className="text-success mb-0 fw-semibold">2016 - 2018</p>
                          </div>
                        </div>
                        <p className="text-muted mb-0">
                          Expanded into backend development with Node.js, Express, and database technologies.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="timeline-item left">
                  <div className="timeline-content">
                    <div className="card border-0 shadow-sm">
                      <div className="card-body p-4">
                        <div className="d-flex align-items-center mb-3">
                          <div className="bg-warning rounded-circle p-3 me-3">
                            <i className="bi bi-layers text-white fs-4"></i>
                          </div>
                          <div>
                            <h4 className="mb-1">Full Stack Mastery</h4>
                            <p className="text-warning mb-0 fw-semibold">2018 - Present</p>
                          </div>
                        </div>
                        <p className="text-muted mb-0">
                          Mastered full-stack development with React, Next.js, and modern development practices.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-5 bg-gradient-primary text-dark">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto text-center">
              <h2 className="display-5 fw-bold mb-4">Ready to Work Together?</h2>
              <p className="lead fs-4 mb-4">
                Let's discuss your project and bring your ideas to life
              </p>
              <a href="/main/contact" className="btn btn-outline-primary btn-lg px-5 py-3 fw-semibold">
                Get In Touch <i className="bi bi-arrow-right ms-2"></i>
              </a>
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
        
        .skill-card {
          padding: 20px;
          background: white;
          border-radius: 12px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          transition: transform 0.3s ease;
        }
        
        .skill-card:hover {
          transform: translateY(-5px);
        }
        
        .progress {
          border-radius: 10px;
          overflow: hidden;
        }
        
        .progress-bar {
          border-radius: 10px;
        }
        
        .timeline-container {
          position: relative;
          padding: 20px 0;
        }
        
        .timeline-container::before {
          content: '';
          position: absolute;
          left: 50%;
          top: 0;
          bottom: 0;
          width: 2px;
          background: linear-gradient(to bottom, #007bff, #28a745, #ffc107);
          transform: translateX(-50%);
        }
        
        .timeline-item {
          position: relative;
          margin-bottom: 40px;
        }
        
        .timeline-item.left {
          padding-right: 50%;
        }
        
        .timeline-item.right {
          padding-left: 50%;
        }
        
        .timeline-content {
          position: relative;
          background: white;
          border-radius: 8px;
        }
        
        .timeline-item.left .timeline-content::after {
          content: '';
          position: absolute;
          right: -15px;
          top: 20px;
          width: 0;
          height: 0;
          border-left: 15px solid white;
          border-top: 10px solid transparent;
          border-bottom: 10px solid transparent;
        }
        
        .timeline-item.right .timeline-content::after {
          content: '';
          position: absolute;
          left: -15px;
          top: 20px;
          width: 0;
          height: 0;
          border-right: 15px solid white;
          border-top: 10px solid transparent;
          border-bottom: 10px solid transparent;
        }
        
        @media (max-width: 768px) {
          .timeline-container::before {
            left: 20px;
          }
          
          .timeline-item.left,
          .timeline-item.right {
            padding-left: 50px;
            padding-right: 0;
          }
          
          .timeline-item.left .timeline-content::after,
          .timeline-item.right .timeline-content::after {
            left: -15px;
            right: auto;
            border-right: 15px solid white;
            border-left: none;
          }
        }
      `}</style>
    </div>
  )
} 