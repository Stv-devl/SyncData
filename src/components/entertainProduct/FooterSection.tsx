'use client';

import { useRouter } from 'next/navigation';
import Button from '../button/Button';

/**
 * Footer section component
 * Displays a call to action for users to sign up
 * @returns {JSX.Element} Footer section component
 */
const FooterSection = () => {
  const router = useRouter();

  return (
    <section className="bg-white py-16 text-darkest-blue">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-semibold">
          Ready to share and organize your files?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl">
          Join thousands of users who trust SyncData for managing and share
          their files.
        </p>
        <div className="mx-auto mt-8 flex h-[38px] max-w-[350px] gap-4">
          <Button onClick={() => router.push('/signup')} label="Try for free" />
        </div>
      </div>
    </section>
  );
};

export default FooterSection;
