import SkillsClient from "@/components/skills-client"
import { generateMetadata, pageMetadata } from '@/utils/metadata';

export const metadata = generateMetadata({
  ...pageMetadata.skills,
  url: '/main/skills'
});

export default function SkillsPage() {
  return <SkillsClient />
} 