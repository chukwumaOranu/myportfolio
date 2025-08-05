import ContactClient from "@/components/contact-client"
import { generateMetadata, pageMetadata } from '@/utils/metadata';

export const metadata = generateMetadata({
  ...pageMetadata.contact,
  url: '/main/contact'
});

export default function ContactPage() {
  return <ContactClient />
} 