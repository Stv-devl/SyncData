import { useEffect } from 'react';
import { useUserStore } from '@/store/useUserStore';
import Layout from '../app/layout';

const App = ({ Component, pageProps }) => {
  const { fetchData } = useUserStore();

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};

export default App;
