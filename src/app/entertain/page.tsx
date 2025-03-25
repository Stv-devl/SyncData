'use client';

import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import FeaturesSection from '@/components/entertainProduct/FeaturesSection';
import CtaSection from '@/components/entertainProduct/FooterSection';
import HeroSection from '@/components/entertainProduct/HeroSection';
import NavBar from '@/components/entertainProduct/NavBar';
import TestimonialsSection from '@/components/entertainProduct/TestimonialsSection';
import Loading from '@/components/loading/Loading';

/**
 * Product showcase component for SyncData
 * Public page that presents product features and benefits
 * @returns {JSX.Element} Complete product showcase page
 */
const ProductShowcase = () => {
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/home');
    }
  }, [status, router]);

  if (status === 'loading') {
    return <Loading />;
  }

  return (
    <div>
      <NavBar />
      <HeroSection />
      <FeaturesSection />
      <TestimonialsSection />
      <CtaSection />
    </div>
  );
};

export default ProductShowcase;
