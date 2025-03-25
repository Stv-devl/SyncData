'use client';

import { useRouter } from 'next/navigation';
import Button from '../button/Button';

/**
 * Hero section for the product showcase
 * Displays main headline, description and call-to-action buttons
 * @returns {JSX.Element} Hero section component
 */
const HeroSection = () => {
  const router = useRouter();

  return (
    <section className="container mx-auto px-6 py-10 md:py-16">
      <div className="flex flex-col items-center md:flex-row md:justify-between">
        <div className="md:w-1/2">
          <h1 className="text-4xl font-bold text-darkest-blue md:text-5xl lg:text-6xl">
            Share Your Data Securely
          </h1>
          <p className="mt-4 text-lg">
            SyncData offers a complete solution to upload, download, organize
            your files and share across all your devices.
          </p>
          <div className="mt-8 flex h-[38px] max-w-[350px] gap-4">
            <Button
              onClick={() => router.push('/signup')}
              label="Start for free"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
