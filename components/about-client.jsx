"use client"

import Image from "next/image"
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchPublicProfile, selectPublicProfile, selectPublicProfileLoading } from "@/app/store/slices/profileCaseSlice"
import { fetchPublicTechnologies, selectPublicTechnologies, selectPublicTechnologyLoading } from "@/app/store/slices/technologyCaseSlice"

export default function AboutClient() {
  const dispatch = useDispatch()
  const profile = useSelector(selectPublicProfile)
  const profileLoading = useSelector(selectPublicProfileLoading)
  const technologies = useSelector(selectPublicTechnologies)
  const techLoading = useSelector(selectPublicTechnologyLoading)
  const [isVisible, setIsVisible] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    setIsVisible(true)
    // Fetch public profile and technologies when component mounts
    dispatch(fetchPublicProfile())
    dispatch(fetchPublicTechnologies())
  }, [dispatch])

  const skills = [
    { name: "React", level: 95, color: "#61DAFB" },
    { name: "Next.js", level: 90, color: "#000000" },
    { name: "Node.js", level: 88, color: "#339933" },
    { name: "TypeScript", level: 85, color: "#3178C6" },
    { name: "Python", level: 80, color: "#3776AB" },
    { name: "AWS", level: 75, color: "#FF9900" },
  ]

  const experiences = [
    {
      title: "Full Stack and Web Development Trainee",
      company: "IT Career Switch United Kingdom",
      period: "2023 - 2024",
      description: "Over the past year, I have been training as a full-stack developer with IT Career Switch, gaining hands-on experience in both frontend and backend development.During this time, I've built and maintained dynamic web applications, developed RESTful APIs, and worked with relational databases to design scalable and secure backend systems. On the frontend, I've focused on building responsive, user-friendly interfaces using React. This experience has equipped me with a strong foundation in modern web development and a practical understanding of full-stack application architecture",
      technologies: ["React", "Node.js", "Express","React", "Vue", "MYSQL"],
      color: "primary"
    },
    {
      title: "Full Stack Developer",
      company: "DeepFlux Innovative Limited",
      period: "2018 - 2022 & Present Remote",
      description: "Led end-to-end development of enterprise-grade web applications serving thousands of users. Architected scalable solutions using modern tech stack, implemented CI/CD pipelines, and mentored junior developers. Delivered 15+ high-impact projects with 99.9% uptime and 40% performance improvements.",
      technologies: ["React", "Node.js", "Express", "MYSQL"],
      color: "primary"
    },
    {
      title: "Frontend Developer",
      company: "Hydracore Innovative Limited",
      period: "2016 - 2018",
      description: "Spearheaded frontend development for client-facing applications, improving user engagement by 60%. Collaborated with UX/UI teams to implement responsive designs and accessibility standards. Optimized application performance resulting in 50% faster load times and enhanced mobile experience.",
      technologies: ["React", "JavaScript", "CSS3", "HTML5", "Bootstrap"],
      color: "success"
    },
    {
      title: "Junior Developer",
      company: "Oranih Global Enterprises",
      period: "2015 - 2016",
      description: "Kickstarted my software development career by building responsive websites and e-commerce platforms. Contributed to 8+ client projects, learned modern development methodologies, and established strong foundation in web technologies. Received recognition for rapid learning and consistent code quality.",
      technologies: ["JavaScript", "CSS3", "HTML5"],
      color: "warning"
    }
  ]

  // Helper function to get color for technology
  const getTechnologyColor = (techName) => {
    const colorMap = {
      'React': '#61DAFB',
      'Next.js': '#000000',
      'Node.js': '#339933',
      'TypeScript': '#3178C6',
      'Python': '#3776AB',
      'AWS': '#FF9900',
      'JavaScript': '#F7DF1E',
      'Express': '#000000',
      'MongoDB': '#47A248',
      'PostgreSQL': '#336791',
      'Git': '#F05032',
      'GitHub': '#181717',
      'Docker': '#2496ED',
      'Vercel': '#000000',
      'VS Code': '#007ACC',
      'Figma': '#F24E1E',
      'HTML5': '#E34F26',
      'CSS3': '#1572B6',
      'Bootstrap': '#7952B3',
      'Tailwind CSS': '#06B6D4',
      'Vue.js': '#4FC08D',
      'Angular': '#DD0031',
      'GraphQL': '#E10098',
      'PHP': '#777BB4',
      'Netlify': '#00C7B7',
    }
    return colorMap[techName] || '#007bff' // Default blue if not found
  }

  // Get top technologies for badges (limit to 3)
  const topTechnologies = isMounted && technologies.length > 0 
    ? technologies.slice(0, 3).map(tech => tech.name)
    : ["React Expert", "Node.js Expert", "Express Expert"]

  // Map real technologies to skills with dynamic levels
  const dynamicSkills = isMounted && technologies.length > 0
    ? technologies.slice(0, 6).map((tech, index) => ({
        name: tech.name,
        level: 85 + (index * 2), // Dynamic levels starting from 85
        color: getTechnologyColor(tech.name)
      }))
    : skills

  return (
    <div className="page-top-spacing">
      {/* Hero Section */}
      <section className="py-5 bg-gradient-primary text-dark position-relative overflow-hidden">
        <div className="position-absolute top-0 start-0 w-100 h-100 opacity-10">
          <div className="position-absolute top-0 start-0 w-100 h-100" style={{ background: 'linear-gradient(45deg, rgba(0, 123, 255, 0.1), rgba(0, 212, 255, 0.1))' }}></div>
        </div>
        <div className="container position-relative" >
          <div className="row align-items-center min-vh-75">
            <div className="col-lg-6">
              <div className={`fade-in ${isVisible ? 'visible' : ''}`}>
                <h1 className="display-2 fw-bold mb-4 text-dark">
                  About Me
                </h1>
                <p className="lead fs-3 mb-4">
                  {isMounted && profile ? 
                    `Passionate ${profile.profession || 'full-stack developer'} with ${new Date().getFullYear() - (profile.age || 25) + 18}+ years of experience creating exceptional digital experiences and innovative solutions.` :
                    'Passionate full-stack developer with 6+ years of experience creating exceptional digital experiences and innovative solutions.'
                  }
                </p>
                <div className="d-flex flex-wrap gap-3">
                  {topTechnologies.map((tech, index) => (
                    <span key={index} className="badge bg-white text-primary fs-6 px-3 py-2">
                      {tech} Expert
                    </span>
                  ))}
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
                  {profileLoading ? (
                    <div className="d-flex align-items-center justify-content-center" style={{ width: 500, height: 500 }}>
                      <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </div>
                  ) : (
                    <Image
                      src={isMounted && profile && profile.profileImage ? 
                        profile.profileImage : 
                        "/placeholder.svg?height=500&width=500"
                      }
                      width={500}
                      height={500}
                      alt={isMounted && profile && profile.full_name ? profile.full_name : "About Me"}
                      className="img-fluid rounded-3 shadow-lg"
                      style={{ transform: "rotate(2deg)" }}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row g-4 text-center">
            <div className="col-md-3">
              <div className="card border-0 bg-white shadow-sm h-100">
                <div className="card-body p-4">
                  <div className="display-4 fw-bold text-primary mb-2">
                    {isMounted && profile && profile.id ? '15+' : '20+'}
                  </div>
                  <p className="text-muted mb-0">Projects Completed</p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card border-0 bg-white shadow-sm h-100">
                <div className="card-body p-4">
                  <div className="display-4 fw-bold text-success mb-2">
                    15+
                  </div>
                  <p className="text-muted mb-0">Years Experience</p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card border-0 bg-white shadow-sm h-100">
                <div className="card-body p-4">
                  <div className="display-4 fw-bold text-warning mb-2">25+</div>
                  <p className="text-muted mb-0">Happy Clients</p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card border-0 bg-white shadow-sm h-100">
                <div className="card-body p-4">
                  <div className="display-4 fw-bold text-info mb-2">
                    {isMounted && technologies.length > 0 ? `${technologies.length}+` : '15+'}
                  </div>
                  <p className="text-muted mb-0">Technologies</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-5 bg-white">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto">
              <div className="text-center mb-5">
                <h2 className="display-5 fw-bold mb-4">Technical Skills</h2>
                <p className="lead text-muted">
                  {isMounted && technologies.length > 0 
                    ? `My expertise spans across ${technologies.length}+ modern web technologies and frameworks, with deep knowledge in both frontend and backend development.`
                    : 'My expertise spans across modern web technologies and frameworks, with deep knowledge in both frontend and backend development.'
                  }
                </p>
              </div>

              <div className="row g-4 mb-5">
                {dynamicSkills.map((skill, index) => (
                  <div key={skill.name} className="col-md-6">
                    <div className="skill-item">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span className="fw-semibold">{skill.name}</span>
                        <span className="text-muted">{skill.level}%</span>
                      </div>
                      <div className="progress" style={{ height: "8px" }}>
                        <div 
                          className="progress-bar" 
                          style={{ 
                            width: `${skill.level}%`, 
                            backgroundColor: skill.color,
                            transition: "width 1.5s ease-in-out"
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 mx-auto">
              <div className="text-center mb-5">
                <h2 className="display-5 fw-bold mb-4">Professional Journey</h2>
                <p className="lead text-muted">
                  My path from curious beginner to seasoned professional
                </p>
              </div>

              <div className="timeline-container">
                {experiences.map((exp, index) => (
                  <div key={index} className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}>
                    <div className="timeline-content">
                      <div className="card border-0 shadow-sm">
                        <div className="card-body p-4">
                          <div className="d-flex align-items-center mb-3">
                            <div className={`bg-${exp.color} rounded-circle p-3 me-3`}>
                              <i className="bi bi-briefcase text-white fs-4"></i>
                            </div>
                            <div>
                              <h4 className="mb-1">{exp.title}</h4>
                              <p className={`text-${exp.color} mb-0 fw-semibold`}>
                                {exp.company} • {exp.period}
                              </p>
                            </div>
                          </div>
                          <p className="text-muted mb-3">{exp.description}</p>
                          <div className="d-flex flex-wrap gap-2">
                            {exp.technologies.map((tech, techIndex) => (
                              <span key={techIndex} className="badge bg-light text-dark">
                                {tech}
                              </span>
                            ))}
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

      {/* Call to Action */}
      <section className="py-5 bg-gradient-primary text-dark">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto text-center">
              <h2 className="display-5 fw-bold mb-4">Ready to Work Together?</h2>
              <p className="lead fs-4 mb-4">
                Let's discuss your next project and bring your ideas to life
              </p>
              <a href="/main/contact" className="btn btn-outline-primary btn-lg px-5 py-3 fw-semibold">
                Get In Touch <i className="bi bi-arrow-right ms-2"></i>
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
        
        .skill-item {
          padding: 20px;
          background: white;
          border-radius: 12px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          transition: transform 0.3s ease;
        }
        
        .skill-item:hover {
          transform: translateY(-5px);
        }
        
        .progress {
          border-radius: 10px;
          overflow: hidden;
        }
        
        .progress-bar {
          border-radius: 10px;
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