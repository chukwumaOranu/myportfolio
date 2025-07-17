import Link from "next/link"

export default function SkillsPreview() {
  const skills = [
    { name: "React", icon: "bi-code-slash", color: "primary" },
    { name: "Node.js", icon: "bi-server", color: "success" },
    { name: "Vue.js", icon: "bi-filetype-tsx", color: "info" },
    { name: "Express.js", icon: "bi-cloud", color: "warning" },
    { name: "MySQL", icon: "bi-database", color: "danger" },
    { name: "Next.js", icon: "bi-box-seam", color: "secondary" },
  ]

  return (
    <section className="py-5 bg-light">
      <div className="container">
        <div className="text-center mb-5">
          <span className="text-primary fw-semibold">Technical Skills</span>
          <h2 className="display-5 fw-bold mt-2 mb-4">Technologies I Work With</h2>
          <p className="lead text-muted">I use cutting-edge technologies to build modern, scalable applications</p>
        </div>

        <div className="row g-4 mb-5">
          {skills.map((skill, index) => (
            <div key={index} className="col-lg-2 col-md-4 col-6">
              <div className="skill-card text-center p-4 bg-white rounded-3 shadow-sm h-100">
                <div className={`bg-${skill.color}-soft rounded-circle p-3 d-inline-flex mb-3`}>
                  <i className={`bi ${skill.icon} text-${skill.color} fs-4`}></i>
                </div>
                <h6 className="mb-0">{skill.name}</h6>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/main/skills" className="btn btn-outline-primary">
            View All Skills <i className="bi bi-arrow-right ms-2"></i>
          </Link>
        </div>
      </div>
    </section>
  )
} 