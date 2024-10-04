'use client';

import Loading from '@/components/loading/Loading';
import PageWrapper from '@/components/wrapper/PageWrapper';
import { useSession } from 'next-auth/react';
import React from 'react';

const Home: React.FC = (): JSX.Element => {
  /*
  const { data: session, status } = useSession();
  if (status === 'loading') {
    return <Loading />;
  }
  if (!session) {
    return <div>You are not logged in.</div>;
  }
  const userId = session.user.id;
*/
  return (
    <>
      <PageWrapper />
    </>
  );
};

export default Home;
