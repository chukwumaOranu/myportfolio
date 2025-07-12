import Link from "next/link"
import Image from "next/image"

export default function AboutPreview() {
  return (
    <section className="py-5 bg-white">
      <div className="container">
        <div className="row align-items-center g-5">
          <div className="col-lg-6">
            <div className="about-image-container">
              <Image
                src="/placeholder.svg?height=600&width=500"
                width={500}
                height={600}
                alt="About John Doe"
                className="img-fluid rounded-3 shadow-lg"
              />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="about-content">
              <div className="mb-4">
                <span className="text-primary fw-semibold">About Me</span>
                <h2 className="display-5 fw-bold mt-2 mb-4">Passionate Developer with 5+ Years Experience</h2>
              </div>
              <p className="lead text-muted mb-4">
                I'm a full-stack developer who loves creating digital solutions that make a difference. With expertise
                in modern web technologies, I help businesses build scalable and user-friendly applications.
              </p>
              <div className="row g-4 mb-4">
                <div className="col-6">
                  <div className="d-flex align-items-center">
                    <div className="bg-primary-soft rounded-circle p-2 me-3">
                      <i className="bi bi-code-slash text-primary"></i>
                    </div>
                    <div>
                      <h6 className="mb-0">50+</h6>
                      <small className="text-muted">Projects Completed</small>
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="d-flex align-items-center">
                    <div className="bg-success-soft rounded-circle p-2 me-3">
                      <i className="bi bi-people text-success"></i>
                    </div>
                    <div>
                      <h6 className="mb-0">30+</h6>
                      <small className="text-muted">Happy Clients</small>
                    </div>
                  </div>
                </div>
              </div>
              <Link href="/about" className="btn btn-outline-primary">
                Learn More About Me <i className="bi bi-arrow-right ms-2"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 