import Hero from "@/components/hero"
import About from "@/components/about"
import Skills from "@/components/skills-preview"
import FeaturedProjects from "@/components/featured-projects"
import Services from "@/components/services"
import CallToAction from "@/components/call-to-action"

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Skills />
      <Services />
      <FeaturedProjects />
      <CallToAction />
    </main>
  )
}
