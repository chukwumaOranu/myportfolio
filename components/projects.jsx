import Image from "next/image"

export default function Projects() {
  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description:
        "A full-featured e-commerce platform built with React, Node.js, and MongoDB. Features include product search, filtering, cart functionality, user authentication, and payment processing.",
      image: "/placeholder.svg?height=400&width=600",
      technologies: ["React", "Node.js", "Express", "MongoDB", "Stripe"],
      demoLink: "https://example.com",
      codeLink: "https://github.com",
    },
    {
      id: 2,
      title: "Task Management App",
      description:
        "A Kanban-style task management application with drag-and-drop functionality. Users can create boards, lists, and cards to organize their tasks and projects.",
      image: "/placeholder.svg?height=400&width=600",
      technologies: ["React", "TypeScript", "Firebase", "Tailwind CSS"],
      demoLink: "https://example.com",
      codeLink: "https://github.com",
    },
    {
      id: 3,
      title: "Real Estate Listing Platform",
      description:
        "A platform for real estate listings with advanced search functionality, map integration, and user authentication. Property owners can list their properties and manage inquiries.",
      image: "/placeholder.svg?height=400&width=600",
      technologies: ["Next.js", "PostgreSQL", "Prisma", "Google Maps API"],
      demoLink: "https://example.com",
      codeLink: "https://github.com",
    },
    {
      id: 4,
      title: "Social Media Dashboard",
      description:
        "A dashboard for managing and analyzing social media accounts across multiple platforms. Features include post scheduling, analytics, and content calendar.",
      image: "/placeholder.svg?height=400&width=600",
      technologies: ["Vue.js", "Express", "Chart.js", "OAuth"],
      demoLink: "https://example.com",
      codeLink: "https://github.com",
    },
    {
      id: 5,
      title: "Fitness Tracking App",
      description:
        "A mobile-first web application for tracking workouts, nutrition, and fitness goals. Users can create custom workout plans and track their progress over time.",
      image: "/placeholder.svg?height=400&width=600",
      technologies: ["React Native", "Node.js", "GraphQL", "MongoDB"],
      demoLink: "https://example.com",
      codeLink: "https://github.com",
    },
    {
      id: 6,
      title: "Weather Forecast App",
      description:
        "A weather forecast application with location detection, 7-day forecasts, and weather alerts. Features a clean, intuitive interface with animated weather icons.",
      image: "/placeholder.svg?height=400&width=600",
      technologies: ["React", "Redux", "OpenWeather API", "Geolocation API"],
      demoLink: "https://example.com",
      codeLink: "https://github.com",
    },
  ]

  return (
    <section id="projects" className="bg-white">
      <div className="container">
        <div className="section-title">
          <h2>My Projects</h2>
        </div>

        <div className="row g-4">
          {projects.map((project) => (
            <div key={project.id} className="col-md-6 col-lg-4">
              <div className="card h-100 border-0 shadow project-card">
                <Image
                  src={project.image || "/placeholder.svg"}
                  width={600}
                  height={400}
                  alt={project.title}
                  className="card-img-top"
                />
                <div className="card-body">
                  <h3 className="card-title h5">{project.title}</h3>
                  <p className="card-text">{project.description}</p>
                  <div className="mb-3">
                    {project.technologies.map((tech, index) => (
                      <span key={index} className="badge bg-primary me-1 mb-1">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="card-footer bg-white border-0">
                  <div className="d-flex justify-content-between">
                    <a href={project.demoLink} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
                      Live Demo
                    </a>
                    <a
                      href={project.codeLink}
                      className="btn btn-outline-primary"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Code
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 