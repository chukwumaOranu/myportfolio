import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

// This would typically come from a database or API
const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description:
      "A full-featured e-commerce platform built with React, Node.js, and MongoDB. Features include product search, filtering, cart functionality, user authentication, and payment processing.",
    fullDescription: `
      This e-commerce platform provides a complete solution for online stores. It features a responsive design that works on all devices, advanced product filtering and search capabilities, and a seamless checkout experience.
      
      The platform includes a comprehensive admin dashboard for managing products, orders, and customers. Store owners can easily add new products, track inventory, and process orders.
      
      User authentication is handled securely, with options for social login. The checkout process is integrated with Stripe for secure payment processing.
      
      The application is built with a React frontend and Node.js backend, with MongoDB as the database. The codebase is well-structured and documented, making it easy to maintain and extend.
    `,
    image: "/placeholder.svg?height=400&width=600",
    screenshots: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    technologies: ["React", "Node.js", "Express", "MongoDB", "Stripe"],
    features: [
      "Responsive design",
      "Advanced product filtering",
      "User authentication",
      "Shopping cart",
      "Secure checkout",
      "Admin dashboard",
      "Order tracking",
      "Inventory management",
    ],
    demoLink: "https://example.com",
    codeLink: "https://github.com",
    slug: "e-commerce-platform",
  },
  {
    id: 2,
    title: "Task Management App",
    description:
      "A Kanban-style task management application with drag-and-drop functionality. Users can create boards, lists, and cards to organize their tasks and projects.",
    fullDescription: `
      This task management application helps teams and individuals organize their work efficiently. It features a Kanban-style interface with drag-and-drop functionality, making it easy to move tasks between different stages.
      
      Users can create multiple boards for different projects, with customizable lists and cards. Each card can include detailed information about the task, such as description, due date, attachments, and comments.
      
      The application supports team collaboration with features like task assignment, mentions, and notifications. Real-time updates ensure that everyone is always on the same page.
      
      Built with React and TypeScript on the frontend, with Firebase providing the backend services, this application offers a seamless and responsive user experience.
    `,
    image: "/placeholder.svg?height=400&width=600",
    screenshots: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    technologies: ["React", "TypeScript", "Firebase", "Tailwind CSS"],
    features: [
      "Drag-and-drop interface",
      "Multiple boards and lists",
      "Task cards with detailed information",
      "Due dates and reminders",
      "File attachments",
      "Comments and mentions",
      "Team collaboration",
      "Real-time updates",
    ],
    demoLink: "https://example.com",
    codeLink: "https://github.com",
    slug: "task-management-app",
  },
  {
    id: 3,
    title: "Real Estate Listing Platform",
    description:
      "A platform for real estate listings with advanced search functionality, map integration, and user authentication. Property owners can list their properties and manage inquiries.",
    fullDescription: `
      This real estate platform connects property buyers, sellers, and agents in a seamless online marketplace. It features comprehensive property listings with detailed information, high-quality images, and virtual tours.
      
      Users can search for properties using various filters such as location, price range, property type, and amenities. The integrated map view allows users to explore properties in specific areas and understand the neighborhood context.
      
      Property owners and agents can create listings, manage inquiries, and track performance metrics. The platform includes a messaging system for direct communication between interested parties.
      
      Built with Next.js for optimal performance and SEO, with PostgreSQL and Prisma for robust data management, this platform provides a reliable and efficient solution for real estate needs.
    `,
    image: "/placeholder.svg?height=400&width=600",
    screenshots: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    technologies: ["Next.js", "PostgreSQL", "Prisma", "Google Maps API"],
    features: [
      "Advanced property search",
      "Map integration",
      "Property listings with details and images",
      "Virtual tours",
      "User authentication",
      "Agent profiles",
      "Messaging system",
      "Saved searches and favorites",
    ],
    demoLink: "https://example.com",
    codeLink: "https://github.com",
    slug: "real-estate-platform",
  },
  {
    id: 4,
    title: "Social Media Dashboard",
    description:
      "A dashboard for managing and analyzing social media accounts across multiple platforms. Features include post scheduling, analytics, and content calendar.",
    fullDescription: `
      This social media dashboard provides a centralized hub for managing and analyzing social media presence across multiple platforms. It offers a comprehensive overview of performance metrics, audience engagement, and content effectiveness.
      
      Users can schedule and publish posts to different platforms from a single interface, with preview functionality to ensure optimal presentation. The content calendar helps in planning and organizing social media strategies.
      
      The analytics section provides detailed insights into post performance, audience demographics, and engagement patterns. Custom reports can be generated for specific time periods and metrics.
      
      Built with Vue.js for a responsive and interactive frontend, with Express handling the backend operations, this dashboard streamlines social media management for individuals and businesses.
    `,
    image: "/placeholder.svg?height=400&width=600",
    screenshots: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    technologies: ["Vue.js", "Express", "Chart.js", "OAuth"],
    features: [
      "Multi-platform management",
      "Post scheduling and publishing",
      "Content calendar",
      "Performance analytics",
      "Audience insights",
      "Custom reports",
      "Team collaboration",
      "Notification system",
    ],
    demoLink: "https://example.com",
    codeLink: "https://github.com",
    slug: "social-media-dashboard",
  },
  {
    id: 5,
    title: "Fitness Tracking App",
    description:
      "A mobile-first web application for tracking workouts, nutrition, and fitness goals. Users can create custom workout plans and track their progress over time.",
    fullDescription: `
      This fitness tracking application helps users maintain a healthy lifestyle by tracking their workouts, nutrition, and progress towards fitness goals. It offers a personalized experience with customizable workout plans and nutrition tracking.
      
      Users can create and follow workout routines, with detailed instructions and video demonstrations for each exercise. The app tracks performance metrics such as sets, reps, and weights, allowing users to monitor their progress over time.
      
      The nutrition tracking feature enables users to log their meals and track calorie intake and macronutrient distribution. Integration with popular food databases makes it easy to find and log food items.
      
      Built with React Native for a native-like mobile experience, with Node.js and GraphQL powering the backend, this app provides a comprehensive solution for fitness enthusiasts.
    `,
    image: "/placeholder.svg?height=400&width=600",
    screenshots: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    technologies: ["React Native", "Node.js", "GraphQL", "MongoDB"],
    features: [
      "Custom workout plans",
      "Exercise library with demonstrations",
      "Performance tracking",
      "Nutrition logging",
      "Goal setting and tracking",
      "Progress visualization",
      "Reminders and notifications",
      "Social sharing",
    ],
    demoLink: "https://example.com",
    codeLink: "https://github.com",
    slug: "fitness-tracking-app",
  },
  {
    id: 6,
    title: "Weather Forecast App",
    description:
      "A weather forecast application with location detection, 7-day forecasts, and weather alerts. Features a clean, intuitive interface with animated weather icons.",
    fullDescription: `
      This weather forecast application provides accurate and up-to-date weather information for locations worldwide. It features a clean and intuitive interface with animated weather icons that make it easy to understand current conditions at a glance.
      
      Users can access detailed forecasts for the current day and up to 7 days ahead, with information on temperature, precipitation, wind speed and direction, humidity, and more. The app automatically detects the user's location for instant local weather updates.
      
      Weather alerts and notifications keep users informed about severe weather conditions and sudden changes. The app also includes features like radar maps, sunrise/sunset times, and air quality index.
      
      Built with React and Redux for state management, with integration to the OpenWeather API for reliable data, this app provides a comprehensive weather solution for everyday use.
    `,
    image: "/placeholder.svg?height=400&width=600",
    screenshots: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    technologies: ["React", "Redux", "OpenWeather API", "Geolocation API"],
    features: [
      "Current weather conditions",
      "7-day forecast",
      "Location detection",
      "Search for any location",
      "Animated weather icons",
      "Weather alerts",
      "Radar maps",
      "Detailed weather metrics",
    ],
    demoLink: "https://example.com",
    codeLink: "https://github.com",
    slug: "weather-forecast-app",
  },
]

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug)

  if (!project) {
    notFound()
  }

  return (
    <div className="bg-white">
      <div className="container py-5">
        <div className="mb-4">
          <Link href="/projects" className="btn btn-outline-primary">
            <i className="bi bi-arrow-left me-2"></i> Back to Projects
          </Link>
        </div>

        <div className="row mb-5">
          <div className="col-lg-8">
            <h1 className="display-5 fw-bold mb-4">{project.title}</h1>
            <p className="lead mb-4">{project.description}</p>

            <div className="mb-4">
              {project.technologies.map((tech, index) => (
                <span key={index} className="badge bg-primary me-2 mb-2">
                  {tech}
                </span>
              ))}
            </div>

            <div className="mb-5">
              <h3 className="h4 mb-3">Project Overview</h3>
              <p className="mb-4">{project.fullDescription}</p>
            </div>

            <div className="mb-5">
              <h3 className="h4 mb-3">Key Features</h3>
              <ul className="list-group list-group-flush">
                {project.features.map((feature, index) => (
                  <li key={index} className="list-group-item bg-transparent ps-0">
                    <i className="bi bi-check-circle-fill text-primary me-2"></i>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="card border-0 shadow-sm mb-4">
              <div className="card-body">
                <h3 className="h5 mb-4">Project Details</h3>

                <div className="d-grid gap-2 mb-4">
                  <a href={project.demoLink} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
                    <i className="bi bi-display me-2"></i> Live Demo
                  </a>
                  <a
                    href={project.codeLink}
                    className="btn btn-outline-primary"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="bi bi-github me-2"></i> View Code
                  </a>
                </div>

                <div className="mb-3">
                  <h4 className="h6">Technologies Used</h4>
                  <p className="mb-0">{project.technologies.join(", ")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row mb-5">
          <div className="col-12">
            <h3 className="h4 mb-4">Project Screenshots</h3>
            <div className="row g-4">
              {project.screenshots.map((screenshot, index) => (
                <div key={index} className="col-md-4">
                  <Image
                    src={screenshot || "/placeholder.svg"}
                    width={600}
                    height={400}
                    alt={`${project.title} Screenshot ${index + 1}`}
                    className="img-fluid rounded shadow"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
