import React from 'react';
import SearchBar from '../page/searchBar/SearchBar';
import ToolsBar from '../page/toolsBar/ToolsBar';
import FileArray from '../page/fileArray/FileArray';

const PageWrapper = () => {
  return (
    <>
      <SearchBar />
      <ToolsBar />
      <FileArray />
    </>
  );
};

export default PageWrapper;
