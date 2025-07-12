export default function Services() {
  const services = [
    {
      icon: "bi-code-slash",
      title: "Frontend Development",
      description: "Creating responsive, interactive user interfaces with React, Next.js, and modern CSS frameworks.",
      color: "primary",
    },
    {
      icon: "bi-server",
      title: "Backend Development",
      description: "Building robust APIs and server-side applications with Node.js, Express, and database integration.",
      color: "success",
    },
    {
      icon: "bi-phone",
      title: "Mobile Development",
      description: "Developing cross-platform mobile applications using React Native and modern mobile technologies.",
      color: "info",
    },
    {
      icon: "bi-cloud",
      title: "Cloud Solutions",
      description: "Deploying and managing applications on AWS, Azure, and other cloud platforms for scalability.",
      color: "warning",
    },
    {
      icon: "bi-gear",
      title: "CI/CD",
      description: "Managing and customizing Apache and Node.js servers, setting up automated deployment pipelines, and infrastructure optimization.",
      color: "danger",
    },
    {
      icon: "bi-people",
      title: "Business Consultancy",
      description: "Providing technical guidance, code reviews, and architecture planning for development teams.",
      color: "secondary",
    },
  ]

  return (
    <section className="py-5 bg-white">
      <div className="container">
        <div className="text-center mb-5">
          <span className="text-primary fw-semibold">Services</span>
          <h2 className="display-5 fw-bold mt-2 mb-4">What I Can Do For You</h2>
          <p className="lead text-muted">Comprehensive development services to bring your ideas to life</p>
        </div>

        <div className="row g-4">
          {services.map((service, index) => (
            <div key={index} className="col-lg-4 col-md-6">
              <div className="service-card p-4 h-100 border-0 shadow-sm rounded-3">
                <div className={`bg-${service.color}-soft rounded-circle p-3 d-inline-flex mb-4`}>
                  <i className={`bi ${service.icon} text-${service.color} fs-3`}></i>
                </div>
                <h4 className="mb-3">{service.title}</h4>
                <p className="text-muted mb-0">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 