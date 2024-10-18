import Button from '@/components/button/Button';
import useManageFilter from '@/hook/manage/useManageFilter';
import React from 'react';
import { iconsMap } from '@/constantes/iconsMap';
import Input from '../../form/Input';
import useModalStore from '@/store/useModale';

const SearchBar = () => {
  const data = {};
  const { searchBar, filteredData, handleChange } = useManageFilter({ data });

  return (
    <section className="mx-auto flex h-[80px] w-full flex-row items-center justify-between rounded-lg bg-white px-2 sm:h-[100px] sm:px-4 md:px-10 ">
      <div className="flex w-3/6 items-center gap-2 text-sm sm:w-[250px] sm:text-base lg:w-[400px]">
        <Input
          name="search"
          type="text"
          value={searchBar}
          handleChange={handleChange}
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
