import AboutClient from "@/components/about-client"
import { generateMetadata, pageMetadata } from '@/utils/metadata';

export const metadata = generateMetadata({
  ...pageMetadata.about,
  url: '/main/about'
});

export default function AboutPage() {
  return <AboutClient />
} 