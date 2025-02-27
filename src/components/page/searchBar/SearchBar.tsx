import React from 'react';
import Input from '../../form/Input';
import { iconsMap } from '@/constantes/iconsMap';
import { useFileStore } from '@/store/useFileStore';

const SearchBar = () => {
  const { filterTools, setFilterTools } = useFileStore();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event) {
      setFilterTools({
        ...filterTools,
        searchbar: event.target.value,
        upselected: null,
        headerType: null,
      });
    }
  };

  return (
    <section className="mx-auto flex h-[80px] w-full items-center justify-between rounded-lg bg-white px-2 sm:min-h-[80px] sm:px-4 md:px-10 ">
      <div className="flex w-3/6 items-center gap-2 text-sm sm:w-[250px] sm:text-base lg:w-[400px]">
        <Input
          name="searchbar"
          type="text"
          value={filterTools.searchbar || ''}
          handleChange={handleInputChange}
          placeholder={`search for a files`}
          autoComplete="off"
          IconComponent={iconsMap.IconSearch}
        />
      </div>
    </section>
  );
};

export default SearchBar;
