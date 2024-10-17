import React, { useEffect } from 'react';
import { useUserStore } from '@/store/useUserStore';
import Loading from '@/components/loading/Loading';

const useFetchData = () => {
  const { user, fetchData, error, loading } = useUserStore();

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <div>Error:</div>;
  }

  const files = user && user.files;
  const profile = user && user.profile;

  return { user, files, profile };
};

export default useFetchData;
