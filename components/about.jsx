import Image from "next/image"

export default function About() {
  return (
    <section id="about" className="bg-white py-5">
      <div className="container">
        <div className="section-title text-center mb-5">
          <h2 className="display-4 fw-bold text-dark mb-3">About Me</h2>
          <div className="divider mx-auto" style={{ width: '60px', height: '4px', background: 'linear-gradient(45deg, #007bff, #00d4ff)', borderRadius: '2px' }}></div>
        </div>
        
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="text-center mb-5">
              <h3 className="h2 mb-4 text-dark fw-bold">
                Passionate about turning ideas into digital reality
              </h3>
              <p className="lead text-muted mb-4" style={{ fontSize: '1.25rem', lineHeight: '1.8' }}>
                I'm a dedicated full stack developer who lives and breathes code. My journey in tech started with curiosity 
                and has evolved into a deep passion for creating meaningful digital experiences that make a difference.
              </p>
            </div>

            {/* Story Sections */}
            <div className="row g-4 mb-5">
              <div className="col-md-6">
                <div className="card h-100 border-0 shadow-sm p-4" style={{ transition: 'transform 0.3s ease, box-shadow 0.3s ease' }}>
                  <div className="card-body">
                    <div className="mb-3">
                      <i className="bi bi-lightbulb text-warning" style={{ fontSize: '2.5rem' }}></i>
                    </div>
                    <h5 className="card-title fw-bold mb-3">The Problem Solver</h5>
                    <p className="card-text text-muted">
                      I love diving deep into complex challenges and finding elegant solutions. Every project is an opportunity 
                      to learn something new and push the boundaries of what's possible in web development.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="col-md-6">
                <div className="card h-100 border-0 shadow-sm p-4" style={{ transition: 'transform 0.3s ease, box-shadow 0.3s ease' }}>
                  <div className="card-body">
                    <div className="mb-3">
                      <i className="bi bi-heart text-danger" style={{ fontSize: '2.5rem' }}></i>
                    </div>
                    <h5 className="card-title fw-bold mb-3">User-Centric Approach</h5>
                    <p className="card-text text-muted">
                      I believe great software starts with understanding the user. Every line of code I write is crafted 
                      with the end user in mind, ensuring experiences that are both beautiful and functional.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="col-md-6">
                <div className="card h-100 border-0 shadow-sm p-4" style={{ transition: 'transform 0.3s ease, box-shadow 0.3s ease' }}>
                  <div className="card-body">
                    <div className="mb-3">
                      <i className="bi bi-graph-up text-success" style={{ fontSize: '2.5rem' }}></i>
                    </div>
                    <h5 className="card-title fw-bold mb-3">Continuous Growth</h5>
                    <p className="card-text text-muted">
                      The tech world evolves rapidly, and I'm committed to staying at the forefront. I'm constantly 
                      exploring new technologies, frameworks, and methodologies to deliver cutting-edge solutions.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="col-md-6">
                <div className="card h-100 border-0 shadow-sm p-4" style={{ transition: 'transform 0.3s ease, box-shadow 0.3s ease' }}>
                  <div className="card-body">
                    <div className="mb-3">
                      <i className="bi bi-people text-primary" style={{ fontSize: '2.5rem' }}></i>
                    </div>
                    <h5 className="card-title fw-bold mb-3">Collaboration & Communication</h5>
                    <p className="card-text text-muted">
                      I thrive in collaborative environments where ideas flow freely. Clear communication and teamwork 
                      are the foundation of every successful project I've been part of.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Personal Touch */}
            <div className="text-center mb-5">
              <div className="bg-gradient-primary text-dark rounded-3 p-5" style={{ background: 'linear-gradient(45deg, rgba(0, 123, 255, 0.1), rgba(0, 212, 255, 0.1))' }}>
                <h4 className="mb-3 fw-bold">Beyond the Code</h4>
                <p className="mb-4" style={{ fontSize: '1.1rem', opacity: '0.9' }}>
                  When I'm not crafting digital experiences, you'll find me exploring the latest tech trends, 
                  contributing to open-source projects, or mentoring aspiring developers. I believe in giving back 
                  to the community that has given me so much.
                </p>
                <p className="mb-0" style={{ fontSize: '1.1rem', opacity: '0.9' }}>
                  Every project is a story waiting to be told, and I'm excited to help you tell yours.
                </p>
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center">
              <div className="bg-light rounded-3 p-4 shadow-sm">
                <h4 className="mb-3 text-dark">Ready to create something amazing together?</h4>
                <p className="text-muted mb-4">
                  Let's turn your vision into reality. I'm always excited to work on new projects and bring fresh ideas to life.
                </p>
                <a href="/main/contact" className="btn btn-outline-primary btn-lg px-4 py-2">
                  <i className="bi bi-envelope me-2"></i>
                  Let's Talk
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 