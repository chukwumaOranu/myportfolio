"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchPublicProfiles, selectPublicProfiles, selectPublicProfileLoading } from "@/app/store/slices/profileCaseSlice"

export default function Hero() {
  const dispatch = useDispatch()
  const profiles = useSelector(selectPublicProfiles)
  const loading = useSelector(selectPublicProfileLoading)
  const [isMounted, setIsMounted] = useState(false)
  
  // Get the first profile (assuming there's only one main profile)
  const profile = profiles.length > 0 ? profiles[0] : null

  useEffect(() => {
    setIsMounted(true)
    // Fetch public profiles when component mounts
    console.log('Hero component mounted, fetching profiles...')
    dispatch(fetchPublicProfiles()).catch(error => {
      console.error('Error fetching profiles:', error)
    })
  }, [dispatch])

  // Default content for SSR
  const defaultName = 'Oranu Chukwuma'
  const defaultProfession = 'Entrepreneur and full-stack developer who revolutionized school management in Nigeria. I built a comprehensive Student Management System that impacted thousands of students and improved administrative efficiency by 70%.'

  return (
    <section className="hero-section position-relative overflow-hidden">
      <div className="hero-bg"></div>
      <div className="container">
        <div className="row align-items-center" style={{ minHeight: '700px' }}>
          <div className="col-lg-6">
            <div className="hero-content">
              <div className="mb-4">
                <span className="badge bg-primary-soft text-primary px-3 py-2 rounded-pill">
                  👋 Hello, I'm {isMounted && (profile?.fullName || profile?.full_name) ? (profile.fullName || profile.full_name) : defaultName}
                </span>
              </div>
              <h1 className="display-4 fw-bold mb-4 text-dark">
                Full Stack Development
                <span className="text-primary d-block">Web Developer</span>
              </h1>
              <p className="lead fs-4 text-muted mb-5">
                {isMounted && (profile?.profession) ? profile.profession : defaultProfession}
              </p>
              <div className="d-flex flex-column flex-sm-row gap-3 mb-5">
                <Link href="/main/projects" className="btn btn-outline-primary btn-lg px-4 py-3">
                  <i className="bi bi-folder me-2"></i>
                  View My Work
                </Link>
                <Link href="/main/contact" className="btn btn-outline-primary btn-lg px-4 py-3">
                  <i className="bi bi-envelope me-2"></i>
                  Let's Talk
                </Link>
              </div>
              <div className="social-links">
                <a href="https://github.com/chukwumaOranu" target="_blank" rel="noopener noreferrer" className="me-3">
                  <i className="bi bi-github fs-4"></i>
                </a>
                <a href="https://www.linkedin.com/in/chukwuma-oranu-1a8a97257/" target="_blank" rel="noopener noreferrer" className="me-3">
                  <i className="bi bi-linkedin fs-4"></i>
                </a>
            
                <a href="mailto:info@chukwumaoranu.co.uk" className="me-3">
                  <i className="bi bi-envelope fs-4"></i>
                </a>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="hero-image-container text-center">
              <div className="hero-image-wrapper position-relative d-inline-block">
                <div className="hero-decoration-1"></div>
                <div className="hero-decoration-2"></div>
                {!isMounted || loading ? (
                  <div className="hero-image-placeholder d-flex align-items-center justify-content-center bg-light rounded-3 shadow-lg" style={{ maxWidth: '100%', width: '100%', height: 'auto', aspectRatio: '1/1', minHeight: '250px' }}>
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                ) : profile?.profileImage ? (
                  <Image
                    src={profile.profileImage}
                    width={500}
                    height={500}
                    alt={`${profile.fullName || profile.full_name} - Full Stack Developer`}
                    className="hero-image img-fluid rounded-3 shadow-lg"
                    style={{ maxWidth: '100%', height: 'auto' }}
                    priority
                  />
                ) : (
                  <Image
                    src="/placeholder.svg?height=500&width=500"
                    width={500}
                    height={500}
                    alt="Profile Placeholder"
                    className="hero-image img-fluid rounded-3 shadow-lg"
                    style={{ maxWidth: '100%', height: 'auto' }}
                    priority
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 