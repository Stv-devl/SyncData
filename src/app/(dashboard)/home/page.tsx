'use client';

import PageWrapper from '@/components/wrapper/PageWrapper';
import { useUserStore } from '@/store/useUserStore';
import React, { useEffect } from 'react';

const Home: React.FC = (): JSX.Element => {
  const { fetchData, error, loading } = useUserStore();

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error:</div>;
  }

  return (
    <>
      <PageWrapper />
    </>
  );
};

export default Home;
