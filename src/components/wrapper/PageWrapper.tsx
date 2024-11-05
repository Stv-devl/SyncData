import React from 'react';
import Array from '../page/array/Array';
import SearchBar from '../page/searchBar/SearchBar';
import ToolsBar from '../page/toolsBar/ToolsBar';

const PageWrapper = () => {
  return (
    <>
      <SearchBar />
      <ToolsBar />
      <Array />
    </>
  );
};

export default PageWrapper;
