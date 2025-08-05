import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Providers from "./providers";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    default: "Oranu Chukwuma | Full Stack Developer",
    template: "%s | Oranu Chukwuma"
  },
  description: "Portfolio website for Oranu Chukwuma, a Full Stack Developer specializing in React, Next.js, Node.js, Express.js and modern web technologies.",
  keywords: ["Full Stack Developer", "React Developer", "Next.js Developer", "Node.js Developer", "Express.js Developer", "Web Developer", "Portfolio", "JavaScript"],
  authors: [{ name: "Oranu Chukwuma" }],
  creator: "Oranu Chukwuma",
  publisher: "Oranu Chukwuma",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://oranuchukwuma.co.uk'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://oranuchukwuma.co.uk',
    title: 'Oranu Chukwuma | Full Stack Developer',
    description: 'Portfolio website for Oranu Chukwuma, a Full Stack Developer specializing in React, Next.js, Node.js, Express.js and modern web technologies.',
    siteName: 'Oranu Chukwuma Portfolio',
    images: [
      {
        url: '/oranuchukwuma.jpg', // Use local image for better reliability
        width: 500,
        height: 500,
        alt: 'Oranu Chukwuma - Full Stack Developer',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <Providers>
          
          <main>{children}</main>
          
        </Providers>
      </body>
    </html>
  );
}
