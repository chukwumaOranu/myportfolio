// SEO utility functions for Next.js App Router built-in metadata

export const generateMetadata = ({
  title,
  description,
  keywords = [],
  image = '/oranuchukwuma.jpg', // Use local image instead of API URL
  url = '',
  type = 'website'
}) => {
  const baseUrl = 'https://oranuchukwuma.co.uk';
  const fullUrl = url ? `${baseUrl}${url}` : baseUrl;
  
  return {
    title,
    description,
    keywords: keywords.join(', '),
    openGraph: {
      title,
      description,
      url: fullUrl,
      siteName: 'Oranu Chukwuma Portfolio',
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'en_US',
      type,
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
  };
};

// Predefined metadata for common pages
export const pageMetadata = {
  home: {
    title: 'Home',
    description: 'Welcome to Oranu Chukwuma\'s portfolio. Full Stack Developer specializing in React, Next.js, Node.js, Express.js and modern web technologies.',
    keywords: ['Full Stack Developer', 'React Developer', 'Next.js Developer', 'Node.js Developer', 'Express.js Developer', 'Web Developer', 'Portfolio'],
  },
  about: {
    title: 'About Me',
    description: 'Learn more about Oranu Chukwuma, a passionate Full Stack Developer with expertise in modern web technologies.',
    keywords: ['About', 'Full Stack Developer', 'Experience', 'Skills', 'Background'],
  },
  projects: {
    title: 'Projects',
    description: 'Explore my latest projects showcasing React, Next.js, Node.js, Express.js and other modern web technologies.',
    keywords: ['Projects', 'Portfolio', 'React Projects', 'Next.js Projects', 'Web Development'],
  },
  contact: {
    title: 'Contact',
    description: 'Get in touch with Oranu Chukwuma for collaboration opportunities, project inquiries, or professional networking.',
    keywords: ['Contact', 'Hire Developer', 'Collaboration', 'Freelance', 'Full Stack Developer'],
  },
  skills: {
    title: 'Skills & Technologies',
    description: 'Comprehensive overview of my technical skills including React, Next.js, Node.js, Express.js and other modern web technologies.',
    keywords: ['Skills', 'Technologies', 'React', 'Next.js', 'Node.js', 'Express.js', 'JavaScript'],
  },
}; 