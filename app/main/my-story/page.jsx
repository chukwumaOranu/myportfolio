"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useDispatch, useSelector } from "react-redux"
import { fetchPublicProfile, selectPublicProfile, selectPublicProfileLoading, selectPublicProfileError } from "@/app/store/slices/profileCaseSlice"

export default function MyStoryPage() {
  const [isVisible, setIsVisible] = useState(false)
  const dispatch = useDispatch()
  const profile = useSelector(selectPublicProfile)
  const loading = useSelector(selectPublicProfileLoading)
  const error = useSelector(selectPublicProfileError)

  useEffect(() => {
    setIsVisible(true)
    // Fetch profile data
    dispatch(fetchPublicProfile())
  }, [dispatch])

  const achievements = [
    {
      icon: "bi bi-people-fill",
      number: "100%",
      label: "Students Impacted",
      color: "primary"
    },
    {
      icon: "bi bi-graph-up-arrow",
      number: "70%",
      label: "Efficiency Improvement",
      color: "success"
    },
    {
      icon: "bi bi-shield-check",
      number: "0",
      label: "Result Mutilation Cases",
      color: "warning"
    },
    {
      icon: "bi bi-building",
      number: "16+",
      label: "Schools Deployed",
      color: "info"
    }
  ]

  const systemFeatures = [
    {
      title: "Automated Result Processing",
      description: "Eliminated manual errors and allowed parents to access results securely online.",
      icon: "bi bi-file-earmark-check",
      color: "primary"
    },
    {
      title: "Fee Payment & Billing System",
      description: "Enabled cashless transactions, fee tracking, and automated invoicing.",
      icon: "bi bi-credit-card",
      color: "success"
    },
    {
      title: "Student Records Management",
      description: "Centralized storage for academic and personal records, ensuring data integrity.",
      icon: "bi bi-person-badge",
      color: "warning"
    },
    {
      title: "Attendance Tracking",
      description: "Monitored student attendance and flagged irregularities automatically.",
      icon: "bi bi-calendar-check",
      color: "info"
    },
    {
      title: "Communication Portal",
      description: "Seamless communication between parents, teachers, and administrators.",
      icon: "bi bi-chat-dots",
      color: "danger"
    },
    {
      title: "SMS & Email Notifications",
      description: "Real-time updates about events, grades, and attendance.",
      icon: "bi bi-envelope",
      color: "secondary"
    }
  ]

  const schoolWebsites = [
    { name: "Peadville Schools", image: "/assets/images/kel1.png?height=600&width=330" },
    { name: "St-Thomas Primary", image: "/assets/images/stpry.png?height=600&width=330" },
    { name: "St-Thomas College", image: "/assets/images/stcollege.png?height=600&width=330" },
    { name: "NAOWA Army Primary School", image: "/assets/images/naowa.png?height=600&width=330" },
    { name: "MPH Primary", image: "/assets/images/mph.png?height=600&width=330" },
    { name: "Ke-Chelsea", image: "/assets/images/kel1.png?height=600&width=330" }
  ]

  return (
    <div className="page-top-spacing">
      {/* Hero Section */}
  <section className="py-5 text-dark position-relative overflow-hidden" style={{ background: 'linear-gradient(45deg, rgba(0, 123, 255, 0.1), rgba(0, 212, 255, 0.1))' }}>
        <div className="position-absolute top-0 start-0 w-100 h-100 opacity-10">
          <div className="position-absolute top-0 start-0 w-100 h-100" ></div>
        </div>
        <div className="container position-relative">
          <div className="row align-items-center min-vh-75">
            <div className="col-lg-6">
              <div className={`fade-in ${isVisible ? 'visible' : ''}`}>
                <h1 className="display-3 fw-bold mb-4">
                  My Entrepreneurial Journey
                </h1>
                {profile?.fullName && (
                  <p className="lead fs-5 text-primary mb-3">
                    {profile.fullName} - Entrepreneur & Technology Innovator
                  </p>
                )}
                <p className="lead fs-4 mb-4">
                  From identifying a critical problem to building a solution that serves thousands
                </p>
                <div className="d-flex flex-wrap gap-3 mb-4">
                  <span className="badge bg-white text-primary fs-6 px-3 py-2">Education Technology</span>
                  <span className="badge bg-white text-primary fs-6 px-3 py-2">Student Management</span>
                  <span className="badge bg-white text-primary fs-6 px-3 py-2">Digital Transformation</span>
                </div>
                <div className="d-flex align-items-center gap-3">
                  <div className="d-flex align-items-center">
                    <i className="bi bi-calendar-check text-warning me-2"></i>
                    <span>Since 2013</span>
                  </div>
                  <div className="d-flex align-items-center">
                    <i className="bi bi-people text-info me-2"></i>
                    <span>Thousands Impacted</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className={`text-center slide-in-right ${isVisible ? 'visible' : ''}`}>
                <div className="position-relative d-inline-block">
                  <div className="position-absolute top-0 start-0 w-100 h-100 bg-warning rounded-3" style={{
                    transform: "rotate(-3deg)",
                    zIndex: -1
                  }}></div>
                  {loading ? (
                    <div 
                      className="bg-light rounded-3 shadow-lg d-flex align-items-center justify-content-center"
                      style={{ 
                        width: '400px', 
                        height: '400px',
                        transform: "rotate(2deg)"
                      }}
                    >
                      <div className="text-center">
                        <div className="spinner-border text-primary mb-2" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                        <p className="text-muted mb-0">Loading profile image...</p>
                      </div>
                    </div>
                  ) : error ? (
                    <div 
                      className="bg-light rounded-3 shadow-lg d-flex align-items-center justify-content-center"
                      style={{ 
                        width: '400px', 
                        height: '400px',
                        transform: "rotate(2deg)"
                      }}
                    >
                      <div className="text-center">
                        <i className="bi bi-exclamation-triangle text-warning mb-2" style={{ fontSize: '2rem' }}></i>
                        <p className="text-muted mb-0">Failed to load image</p>
                      </div>
                    </div>
                  ) : (
                    <Image
                      src={profile?.profileImage || "/placeholder-user.jpg"}
                      width={400}
                      height={400}
                      alt={`${profile?.fullName || 'Oranu Chukwuma'} - Entrepreneur`}
                      className="img-fluid rounded-3 shadow-lg"
                      style={{ transform: "rotate(2deg)" }}
                      priority
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Challenge Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 mx-auto">
              <div className="text-center mb-5">
                <h2 className="display-5 fw-bold mb-4">The Problem I Identified</h2>
                <p className="lead text-muted">
                  In 2013, I discovered a major challenge plaguing the Nigerian school system
                </p>
              </div>
              
              <div className="row g-4">
                <div className="col-md-6">
                  <div className="card h-100 border-0 shadow-sm">
                    <div className="card-body p-4">
                      <div className="mb-3">
                        <i className="bi bi-exclamation-triangle text-warning" style={{ fontSize: '2.5rem' }}></i>
                      </div>
                      <h5 className="card-title fw-bold mb-3">Manual Result Processing</h5>
                      <p className="card-text text-muted">
                        Schools relied heavily on paper-based methods to issue report cards. Students often mutilated 
                        or altered their results before presenting them to parents, leading to misinformation and lack of accountability.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="col-md-6">
                  <div className="card h-100 border-0 shadow-sm">
                    <div className="card-body p-4">
                      <div className="mb-3">
                        <i className="bi bi-folder-x text-danger" style={{ fontSize: '2.5rem' }}></i>
                      </div>
                      <h5 className="card-title fw-bold mb-3">Inefficient Record Keeping</h5>
                      <p className="card-text text-muted">
                        Record-keeping was inefficient, data was easily lost, and communication between schools 
                        and parents was severely limited. There was no centralized system for managing student information.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Solution Section */}
      <section className="py-5 bg-white">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 mx-auto">
              <div className="text-center mb-5">
                <h2 className="display-5 fw-bold mb-4">The Solution I Built</h2>
                <p className="lead text-muted">
                  A comprehensive Student Management System that revolutionized school administration
                </p>
              </div>
              
              <div className="row g-4 mb-5">
                {systemFeatures.map((feature, index) => (
                  <div key={index} className="col-md-6 col-lg-4">
                    <div className="card h-100 border-0 shadow-sm">
                      <div className="card-body p-4 text-center">
                        <div className={`mb-3 text-${feature.color}`}>
                          <i className={`${feature.icon}`} style={{ fontSize: '2.5rem' }}></i>
                        </div>
                        <h5 className="card-title mb-3">{feature.title}</h5>
                        <p className="card-text text-muted">{feature.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 mx-auto">
              <div className="text-center mb-5">
                <h2 className="display-5 fw-bold mb-4">Impact & Achievements</h2>
                <p className="lead text-muted">
                  The results speak for themselves
                </p>
              </div>
              
              <div className="row g-4">
                {achievements.map((achievement, index) => (
                  <div key={index} className="col-md-6 col-lg-3">
                    <div className="card border-0 bg-white shadow-sm h-100">
                      <div className="card-body p-4 text-center">
                        <div className={`text-${achievement.color} mb-3`}>
                          <i className={`${achievement.icon}`} style={{ fontSize: '2.5rem' }}></i>
                        </div>
                        <div className={`display-6 fw-bold text-${achievement.color} mb-2`}>{achievement.number}</div>
                        <p className="text-muted mb-0">{achievement.label}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* School Websites Section */}
      <section className="py-5 bg-white">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 mx-auto">
              <div className="text-center mb-5">
                <h2 className="display-5 fw-bold mb-4">School Website Prototypes</h2>
                <p className="lead text-muted">
                  Custom websites for every school that signs up for the application
                </p>
              </div>
              
              <div className="row g-4">
                {schoolWebsites.map((school, index) => (
                  <div key={index} className="col-md-6 col-lg-4">
                    <div className="card border-0 shadow-sm h-100">
                      <div className="card-img-top">
                        <Image
                          src={school.image}
                          width={600}
                          height={250}
                          alt={school.name}
                          className="img-fluid w-100"
                          style={{ objectFit: 'cover', height: '250px' }}
                        />
                      </div>
                      <div className="card-body p-4">
                        <h5 className="card-title fw-bold mb-2">{school.name}</h5>
                        <p className="card-text text-muted">
                          Fully customizable, mobile-friendly website that integrates seamlessly with the Student Management System.
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Takeaway Section */}
      <section className="py-5 text-dark" style={{ background: 'linear-gradient(45deg, rgba(0, 123, 255, 0.1), rgba(0, 212, 255, 0.1))' }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto text-center">
              <h2 className="display-5 fw-bold mb-4">Key Takeaway</h2>
              <p className="lead fs-4 mb-4">
                My story demonstrates that passion, vision, and determination can turn even the simplest ideas into impactful solutions—proving that technology is not just a tool but a powerful enabler of change.
              </p>
              <div className="bg-white bg-opacity-10 rounded-3 p-4">
                <p className="mb-0 fs-5">
                  <strong>2024 till date:</strong> My passion for technology continues to drive my entrepreneurial success. 
                  With continuous upgrades and enhancements, I remain committed to empowering schools in Nigeria and beyond 
                  with innovative solutions that simplify management and improve educational outcomes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto text-center">
              <h2 className="display-5 fw-bold mb-4">Ready to get your school to a digital age?</h2>
              <p className="lead text-muted mb-4">
                Sign up for a free demo and see how we can transform your school to a digital age
              </p>
              <a href="https://www.deepflux.com.ng" className="btn btn-outline-primary btn-lg px-5 py-3 fw-semibold">
                Visit Official Website <i className="bi bi-arrow-right ms-2"></i>
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
        
        .slide-in-right {
          opacity: 0;
          transform: translateX(50px);
          transition: all 0.8s ease-out 0.3s;
        }
        
        .slide-in-right.visible {
          opacity: 1;
          transform: translateX(0);
        }
        
        .card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0,0,0,0.1) !important;
        }
      `}</style>
    </div>
  )
} 