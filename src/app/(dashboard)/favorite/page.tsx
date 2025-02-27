'use client';

import React, { useEffect } from 'react';
import Array from '@/components/page/array/Array';
import SearchBar from '@/components/page/searchBar/SearchBar';
import ToolsBar from '@/components/page/toolsBar/ToolsBar';
import { useFileStore } from '@/store/useFileStore';

const Favorite = () => {
  const { files, setDisplayFavoritesFile, setIsFavoritePage, setCurrentPage } =
    useFileStore();

  useEffect(() => {
    if (!files) return;
    setDisplayFavoritesFile(files);
    setIsFavoritePage(true);

    return () => {
      setIsFavoritePage(false);
    };
  }, [files, setDisplayFavoritesFile, setIsFavoritePage, setCurrentPage]);

  return (
    <>
      <SearchBar />
      <ToolsBar />
      <Array />
    </>
  );
};

export default Favorite;
