import Link from "next/link"
import Image from "next/image"

export default function FeaturedSection() {
  const featuredProjects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "A full-featured online shopping experience with React and Node.js",
      image: "/placeholder.svg?height=400&width=600",
      slug: "e-commerce-platform",
    },
    {
      id: 2,
      title: "Task Management App",
      description: "Kanban-style task organization with drag-and-drop functionality",
      image: "/placeholder.svg?height=400&width=600",
      slug: "task-management-app",
    },
    {
      id: 3,
      title: "Real Estate Platform",
      description: "Property listings with advanced search and map integration",
      image: "/placeholder.svg?height=400&width=600",
      slug: "real-estate-platform",
    },
  ]

  return (
    <section className="py-5 bg-white" style={{ paddingTop: "6rem", paddingBottom: "6rem" }}>
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="display-4 fw-bold mb-4">Featured Projects</h2>
          <p className="lead text-muted fs-4">Check out some of my recent work</p>
        </div>

        <div className="row g-4">
          {featuredProjects.map((project) => (
            <div key={project.id} className="col-lg-4 col-md-6">
              <div className="featured-project shadow-lg h-100">
                <Image
                  src={project.image || "/placeholder.svg"}
                  width={600}
                  height={400}
                  alt={project.title}
                  className="img-fluid w-100"
                />
                <div className="featured-project-content">
                  <h3 className="h4 mb-3">{project.title}</h3>
                  <p className="mb-4">{project.description}</p>
                  <a
                    href={project.slug}
                    className="btn btn-light btn-lg"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Project <i className="bi bi-arrow-right ms-2"></i>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-5">
          <Link href="/projects" className="btn btn-primary btn-lg px-5 py-3">
            <i className="bi bi-grid me-2"></i>
            View All Projects
          </Link>
        </div>
      </div>
    </section>
  )
} 