'use client';

import { useCallback, useMemo, useState } from 'react';

/**
 * Custom hook for managing and filtering media items based on user input.
 * @param {UseManageFilterProps} props - The properties for managing filterable media.
 * @returns {UseManageFilterReturn} An object containing:
 * - `searchBar`: The current search input value.
 * - `filteredData`: The list of media items filtered based on the search input.
 * - `handleChange`: Function to handle changes to the search input.
 * - `isSearching`: Boolean indicating if a search is currently active.
 */
const useManageFilter = ({ data }) => {
  const [searchBar, setSearchBar] = useState<string>('');

  const filteredData = useMemo(() => {}, []);

  /**
   * Handles changes to the search input.
   * @param {object} updates - An object containing the updated search value.
   */
  const handleChange = useCallback((updates: { [key: string]: string }) => {
    setSearchBar(updates.search);
  }, []);

  return { searchBar, filteredData, handleChange };
};

export default useManageFilter;
