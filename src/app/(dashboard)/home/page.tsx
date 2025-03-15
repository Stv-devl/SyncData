'use client';

import React from 'react';
import Array from '@/components/page/array/Array';
import SearchBar from '@/components/page/searchBar/SearchBar';
import ToolsBar from '@/components/page/toolsBar/ToolsBar';

/**
 * Home page component
 * @returns The home page component
 */

const Home: React.FC = (): JSX.Element => {
  return (
    <>
      <SearchBar />
      <ToolsBar />
      <Array />
    </>
  );
};

export default Home;
