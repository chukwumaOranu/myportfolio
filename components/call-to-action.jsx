import Link from "next/link"

export default function CallToAction() {
  return (
    <section className="py-5 bg-gradient-primary text-dark"style={{ background: 'linear-gradient(45deg, rgba(0, 123, 255, 0.1), rgba(0, 212, 255, 0.1))' }}>
      <div className="container">
        <div className="row">
          <div className="col-lg-8 mx-auto text-center">
            <h2 className="display-5 fw-bold mb-4">Ready to Start Your Project?</h2>
            <p className="lead fs-4 mb-5">
              Let's work together to bring your ideas to life. I'm available for freelance projects and full-time
              opportunities.
            </p>
            <div className="d-flex justify-content-center flex-column flex-sm-row gap-3">
              <Link href="/main/contact" className="btn btn-outline-primary btn-lg px-5">
                <i className="bi bi-envelope me-2"></i>
                Get In Touch
              </Link>
              <Link href="/main/projects" className="btn btn-outline-primary btn-lg px-5">
                <i className="bi bi-folder me-2"></i>
                View My Work
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 