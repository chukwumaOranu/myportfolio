"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setIsMounted(true)
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  if (!isMounted) {
    return null
  }

  return (
    <nav className={`navbar navbar-expand-lg fixed-top ${isScrolled ? "navbar-scrolled shadow-sm" : ""}`} style={{ backgroundColor: '#071f6b' }}>
      <div className="container">
        <Link href="/" className="navbar-brand text-white hover:text-white fw-bold" style={{ 
          fontWeight: '700', 
          fontSize: '1.8rem',
          fontFamily: "'Poppins', 'Inter', 'Segoe UI', sans-serif",
          letterSpacing: '0.5px'
        }}>
          Oranu Chukwuma
        </Link>

        <button
          className="navbar-toggler border-0"
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-controls="navbarNav"
          aria-expanded={isMenuOpen ? "true" : "false"}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" style={{ filter: 'invert(1)' }}></span>
        </button>

        <div className={`collapse navbar-collapse ${isMenuOpen ? "show" : ""}`} id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link href="/" className={`nav-link text-white hover:text-white ${pathname === "/" ? "text-white font-medium" : ""}`}>
                <span className="text-white">Home</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/main/about" className={`nav-link text-white hover:text-white ${pathname === "/about" ? "text-white font-medium" : ""}`}>
                <span className="text-white">About Me</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/main/my-story" className={`nav-link text-white hover:text-white ${pathname === "/my-story" ? "text-white font-medium" : ""}`}>
                <span className="text-white">My Story</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/main/skills" className={`nav-link text-white hover:text-white ${pathname === "/skills" ? "text-white font-medium" : ""}`}>
                <span className="text-white">Skills</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/main/projects" className={`nav-link text-white hover:text-white ${pathname === "/projects" ? "text-white font-medium" : ""}`}>
                <span className="text-white">My Work</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/main/contact" className={`nav-link text-white hover:text-white ${pathname === "/contact" ? "text-white font-medium" : ""}`}>
                <span className="text-white">Contact</span>
              </Link>
            </li>
            <li className="nav-item d-none d-lg-block ms-2">
              <Link href="/main/contact" className="btn btn-light btn-sm rounded-pill px-3 py-2 text-dark hover:bg-white">
                Hire Me
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
} 