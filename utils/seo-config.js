import { DefaultSeo } from 'next-seo';

// Default SEO configuration
export const defaultSEOConfig = {
  title: 'Oranu Chukwuma | Full Stack Developer',
  titleTemplate: '%s | Oranu Chukwuma',
  defaultTitle: 'Oranu Chukwuma | Full Stack Developer',
  description: 'Portfolio website for Oranu Chukwuma, a Full Stack Developer specializing in React, Next.js, Node.js, Express.js and modern web technologies.',
  canonical: 'https://oranuchukwuma.co.uk',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://oranuchukwuma.co.uk',
    siteName: 'Oranu Chukwuma Portfolio',
    title: 'Oranu Chukwuma | Full Stack Developer',
    description: 'Portfolio website for Oranu Chukwuma, a Full Stack Developer specializing in React, Next.js, Node.js, Express.js and modern web technologies.',
    images: [
      {
        url: 'https://api.chukwumaoranu.co.uk/uploads/profile-pictures/profile-1-1751946687632.jpg',
        width: 500,
        height: 500,
        alt: 'Oranu Chukwuma - Full Stack Developer',
      },
    ],
  },
  additionalMetaTags: [
    {
      name: 'keywords',
      content: 'Full Stack Developer, React Developer, Next.js Developer, Node.js Developer, Express.js Developer, Web Developer, Portfolio, JavaScript',
    },
    {
      name: 'author',
      content: 'Oranu Chukwuma',
    },
    {
      name: 'robots',
      content: 'index, follow',
    },
  ],
  additionalLinkTags: [
    {
      rel: 'icon',
      href: '/favicon.ico',
    },
    {
      rel: 'apple-touch-icon',
      href: '/apple-touch-icon.png',
      sizes: '180x180',
    },
    {
      rel: 'manifest',
      href: '/manifest.json',
    },
  ],
};

// SEO configuration for different pages
export const pageSEOConfigs = {
  home: {
    title: 'Home',
    description: 'Welcome to Oranu Chukwuma\'s portfolio. Full Stack Developer specializing in React, Next.js, Node.js, Express.js and modern web technologies.',
    openGraph: {
      title: 'Oranu Chukwuma | Full Stack Developer',
      description: 'Welcome to Oranu Chukwuma\'s portfolio. Full Stack Developer specializing in React, Next.js, Node.js, Express.js and modern web technologies.',
      url: 'https://oranuchukwuma.co.uk/main/home',
    },
  },
  about: {
    title: 'About Me',
    description: 'Learn more about Oranu Chukwuma, a passionate Full Stack Developer with expertise in modern web technologies.',
    openGraph: {
      title: 'About Me | Full Stack Developer',
      description: 'Learn more about Oranu Chukwuma, a passionate Full Stack Developer with expertise in modern web technologies.',
      url: 'https://oranuchukwuma.co.uk/main/about',
    },
  },
  projects: {
    title: 'Projects',
    description: 'Explore my latest projects showcasing React, Next.js, Node.js, Express.js and other modern web technologies.',
    openGraph: {
      title: 'Projects | Full Stack Developer Portfolio',
      description: 'Explore my latest projects showcasing React, Next.js, Node.js, Express.js and other modern web technologies.',
      url: 'https://oranuchukwuma.co.uk/main/projects',
    },
  },
  contact: {
    title: 'Contact',
    description: 'Get in touch with Oranu Chukwuma for collaboration opportunities, project inquiries, or professional networking.',
    openGraph: {
      title: 'Contact Me | Full Stack Developer',
      description: 'Get in touch with Oranu Chukwuma for collaboration opportunities, project inquiries, or professional networking.',
      url: 'https://oranuchukwuma.co.uk/main/contact',
    },
  },
  skills: {
    title: 'Skills & Technologies',
    description: 'Comprehensive overview of my technical skills including React, Next.js, Node.js, Express.js and other modern web technologies.',
    openGraph: {
      title: 'Skills & Technologies | Full Stack Developer',
      description: 'Comprehensive overview of my technical skills including React, Next.js, Node.js, Express.js and other modern web technologies.',
      url: 'https://oranuchukwuma.co.uk/main/skills',
    },
  },
};

// Default SEO component
export function DefaultSEO() {
  return <DefaultSeo {...defaultSEOConfig} />;
} 