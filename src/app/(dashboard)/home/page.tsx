'use client';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import React, { useEffect } from 'react';
import Loading from '@/components/loading/Loading';
import Array from '@/components/page/array/Array';
import SearchBar from '@/components/page/searchBar/SearchBar';
import ToolsBar from '@/components/page/toolsBar/ToolsBar';

/**
 * Home page component
 * @returns The home page component
 */

const Home: React.FC = (): JSX.Element => {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  if (status === 'loading') return <Loading />;

  return (
    <>
      <SearchBar />
      <ToolsBar />
      <Array />
    </>
  );
};

export default Home;
