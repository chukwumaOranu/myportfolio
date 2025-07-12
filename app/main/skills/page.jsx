"use client"

import { useState, useEffect } from "react"

export default function SkillsPage() {
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
          <div className="row align-items-center min-vh-75">
            <div className="col-lg-6">
              <div className={`fade-in ${isVisible ? 'visible' : ''}`}>
                <h1 className="display-2 fw-bold mb-4 text-dark">
                  Technical Skills
                </h1>
                <p className="lead fs-3 mb-4">
                  A comprehensive overview of my technical expertise and proficiency levels
                </p>
                <div className="d-flex flex-wrap gap-3">
                  <span className="badge bg-white text-primary fs-6 px-3 py-2">3 Categories</span>
                  <span className="badge bg-white text-primary fs-6 px-3 py-2">18 Skills</span>
                  <span className="badge bg-white text-primary fs-6 px-3 py-2">5+ Years</span>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className={`text-center slide-in-right ${isVisible ? 'visible' : ''}`}>
                <div className="position-relative d-inline-block">
                  <div className="position-absolute top-0 start-0 w-100 h-100 bg-primary rounded-3" style={{
                    transform: "rotate(-3deg)",
                    zIndex: -1
                  }}></div>
                  <div className="bg-white rounded-3 p-4 shadow-lg" style={{ transform: "rotate(2deg)" }}>
                    <i className="bi bi-code-slash text-primary display-1"></i>
                    <div className="mt-3">
                      <i className="bi bi-server text-success fs-1 me-3"></i>
                      <i className="bi bi-cloud text-warning fs-1"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Navigation */}
      <section className="py-4 bg-white border-bottom">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto">
              <div className="d-flex flex-wrap justify-content-center gap-2">
                {skillCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`category-btn ${activeCategory === category.id ? 'active' : ''}`}
                    style={{
                      background: activeCategory === category.id ? category.gradient : 'transparent',
                      border: `2px solid ${category.color}`,
                      color: activeCategory === category.id ? 'white' : category.color
                    }}
                  >
                    {category.title}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 mx-auto">
              <div className="text-center mb-5">
                <h2 className="display-5 fw-bold mb-3">{currentCategory.title}</h2>
                <div 
                  className="mx-auto rounded-pill mb-4"
                  style={{ 
                    width: "80px", 
                    height: "6px",
                    background: currentCategory.gradient
                  }}
                ></div>
                <p className="lead text-muted">
                  Expertise in modern technologies and frameworks
                </p>
              </div>

              <div className="row g-4">
                {currentCategory.skills.map((skill, index) => (
                  <div key={skill.name} className="col-lg-6">
                    <div className={`skill-card ${animatedSkills[skill.name] ? 'animated' : ''}`} 
                         style={{ animationDelay: `${index * 0.1}s` }}>
                      <div className="card border-0 shadow-lg h-100 overflow-hidden">
                        <div className="card-body p-4">
                          <div className="d-flex align-items-center mb-4">
                            <div className="skill-icon me-3" style={{ backgroundColor: skill.color }}>
                              <i className={`bi ${skill.icon} text-white fs-4`}></i>
                            </div>
                            <div className="flex-grow-1">
                              <h5 className="mb-1 fw-bold">{skill.name}</h5>
                              <small className="text-muted">Proficiency Level</small>
                            </div>
                            <div className="skill-level">
                              <span className="fw-bold" style={{ color: skill.color }}>
                                {skill.level}%
                              </span>
                            </div>
                          </div>
                          <div className="progress-container">
                            <div className="progress" style={{ height: "12px", borderRadius: "10px" }}>
                              <div
                                className="progress-bar"
                                style={{ 
                                  width: animatedSkills[skill.name] ? `${skill.level}%` : "0%",
                                  backgroundColor: skill.color,
                                  borderRadius: "10px",
                                  transition: "width 1.5s ease-in-out"
                                }}
                              ></div>
                            </div>
                            <div className="skill-description mt-3">
                              <small className="text-muted">
                                {skill.level >= 90 ? "Expert" : 
                                 skill.level >= 80 ? "Advanced" : 
                                 skill.level >= 70 ? "Intermediate" : "Beginner"}
                              </small>
                            </div>
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

      {/* Skills Overview */}
      <section className="py-5 bg-white">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto text-center mb-5">
              <h2 className="display-5 fw-bold mb-4">Skills Overview</h2>
              <p className="lead text-muted">A visual representation of my technical expertise</p>
            </div>
          </div>
          <div className="row g-4">
            {skillCategories.map((category, index) => (
              <div key={category.id} className="col-md-4">
                <div className="overview-card" style={{ background: category.gradient }}>
                  <div className="card-body p-4 text-white text-center">
                    <div className="mb-3">
                      <i className={`bi ${category.id === 'Frontend' ? 'bi-code-slash' : 
                                      category.id === 'Backend' ? 'bi-server' : 'bi-cloud'} fs-1`}></i>
                    </div>
                    <h4 className="mb-2">{category.title}</h4>
                    <p className="mb-3 opacity-75">{category.skills.length} Skills</p>
                    <div className="d-flex justify-content-center">
                      <span className="badge bg-white text-dark">
                        Avg: {Math.round(category.skills.reduce((sum, skill) => sum + skill.level, 0) / category.skills.length)}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto text-center mb-5">
              <h2 className="display-5 fw-bold mb-4">Certifications & Education</h2>
              <p className="lead text-muted">Continuous learning and professional development</p>
            </div>
          </div>
          <div className="row g-4">
            {certifications.map((cert, index) => (
              <div key={cert.title} className="col-md-4">
                <div className={`certification-card ${isVisible ? 'visible' : ''}`} 
                     style={{ animationDelay: `${index * 0.2}s` }}>
                  <div className="card border-0 shadow-lg h-100">
                    <div className="card-body p-4 text-center">
                      <div className="cert-icon mb-3" style={{ color: cert.color }}>
                        <i className={`bi ${cert.icon} fs-1`}></i>
                      </div>
                      <h5 className="mb-2">{cert.title}</h5>
                      <p className="text-muted mb-2">{cert.subtitle}</p>
                      <span className="badge bg-light text-dark">{cert.year}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-5 bg-gradient-primary text-dark">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto text-center">
              <h2 className="display-5 fw-bold mb-4">Ready to Collaborate?</h2>
              <p className="lead fs-4 mb-4">
                Let's work together to bring your ideas to life with these skills
              </p>
              <a href="/main/contact" className="btn btn-light btn-lg px-5 py-3 fw-semibold">
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
        
        .slide-in-right {
          opacity: 0;
          transform: translateX(50px);
          transition: all 0.8s ease-out 0.3s;
        }
        
        .slide-in-right.visible {
          opacity: 1;
          transform: translateX(0);
        }
        
        .category-btn {
          padding: 12px 24px;
          border-radius: 25px;
          font-weight: 600;
          transition: all 0.3s ease;
          border: 2px solid;
        }
        
        .category-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        }
        
        .skill-card {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.6s ease-out;
        }
        
        .skill-card.animated {
          opacity: 1;
          transform: translateY(0);
        }
        
        .skill-icon {
          width: 60px;
          height: 60px;
          border-radius: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.3s ease;
        }
        
        .skill-card:hover .skill-icon {
          transform: scale(1.1) rotate(5deg);
        }
        
        .progress-container {
          position: relative;
        }
        
        .progress {
          background-color: #f8f9fa;
          overflow: hidden;
        }
        
        .overview-card {
          border-radius: 15px;
          transition: transform 0.3s ease;
        }
        
        .overview-card:hover {
          transform: translateY(-10px);
        }
        
        .certification-card {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.6s ease-out;
        }
        
        .certification-card.visible {
          opacity: 1;
          transform: translateY(0);
        }
        
        .cert-icon {
          transition: transform 0.3s ease;
        }
        
        .certification-card:hover .cert-icon {
          transform: scale(1.2);
        }
        
        .card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(0,0,0,0.15) !important;
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