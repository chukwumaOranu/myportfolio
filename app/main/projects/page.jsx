import ProjectsClient from "@/components/projects-client"
import { generateMetadata, pageMetadata } from '@/utils/metadata';

export const metadata = generateMetadata({
  ...pageMetadata.projects,
  url: '/main/projects'
});

export default function ProjectsPage() {
  return <ProjectsClient />
} 