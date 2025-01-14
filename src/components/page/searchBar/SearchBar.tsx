import React from 'react';
import Input from '../../form/Input';
import Button from '@/components/button/Button';
import { iconsMap } from '@/constantes/iconsMap';
import useModalStore from '@/store/ui/useModale';
import { useFileStore } from '@/store/useFileStore';

const SearchBar = () => {
  const { filterTools, setFilterTools } = useFileStore();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event) {
      setFilterTools({ searchbar: event.target.value });
    }
  };

  return (
    <section className="mx-auto flex h-[80px] w-full flex-row items-center justify-between rounded-lg bg-white px-2 sm:h-[100px] sm:px-4 md:px-10 ">
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
      <div className="h-[35px] w-2/5 text-sm sm:h-[40px] sm:w-[210px] sm:text-base">
        <Button
          label={
            <>
              <span className="block sm:hidden">Add team</span>
              <span className="hidden sm:block">Add a team member</span>
            </>
          }
          color={'empty'}
          onClick={() => useModalStore.getState().openModal('AddTeam')}
          disabled={false}
          IconComponent={iconsMap.IconAddTeam}
        />
      </div>
    </section>
  );
};

export default SearchBar;
