'use client';

import Loading from '@/components/loading/Loading';
import { useSession } from 'next-auth/react';
import React from 'react';

const Home: React.FC = (): JSX.Element => {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <Loading />;
  }

  if (!session) {
    return <div>You are not logged in.</div>;
  }

  const userId = session.user.id;

  return (
    <div>
      <h1>Home page</h1>
    </div>
  );
};

export default Home;
