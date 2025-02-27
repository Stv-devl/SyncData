'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

/**
 * Home page component
 * @returns The home page component
 */

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    router.push('/home');
  }, [router]);

  return null;
}
