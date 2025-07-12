import Link from "next/link"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="text-white py-5" style={{ backgroundColor: '#071f6b' }}>
      <div className="container">
        <div className="row">
          <div className="col-lg-4 mb-4 mb-lg-0">
            <h4 className="mb-4">Oranu Chukwuma</h4>
            <p>
              Entrepreneur and Full Stack Developer who revolutionized school management in Nigeria. Creating impactful digital solutions that drive real business results and transform user experiences.
            </p>
          </div>
          <div className="col-lg-4 mb-4 mb-lg-0">
            <h4 className="mb-4">Quick Links</h4>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link href="/" className="text-white text-decoration-none">
                  Home
                </Link>
              </li>
              <li className="mb-2">
                <Link href="/about" className="text-white text-decoration-none">
                  About Me
                </Link>
              </li>
              <li className="mb-2">
                <Link href="/skills" className="text-white text-decoration-none">
                  Skills
                </Link>
              </li>
              <li className="mb-2">
                <Link href="/projects" className="text-white text-decoration-none">
                  My Work
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white text-decoration-none">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-lg-4">
            <h4 className="mb-4">Connect With Me</h4>
            <div className="social-links mb-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="bg-dark me-2"
              >
                <i className="bi bi-github"></i>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="bg-dark me-2"
              >
                <i className="bi bi-linkedin"></i>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="bg-dark"
              >
                <i className="bi bi-twitter"></i>
              </a>
            </div>
            <p>info@chukwumaoranu.co.uk</p>
            <p>+44 (0) 7769210752</p>
          </div>
        </div>
        <hr className="my-4" />
        <div className="text-center">
          <p className="mb-0">&copy; {currentYear} Oranu Chukwuma. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
} 