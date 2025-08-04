import { NextSeo } from 'next-seo';
import { pageSEOConfigs } from '@/utils/seo-config';
import AboutPage from './page';

export default function AboutPageWrapper() {
  return (
    <>
      <NextSeo {...pageSEOConfigs.about} />
      <AboutPage />
    </>
  );
} 