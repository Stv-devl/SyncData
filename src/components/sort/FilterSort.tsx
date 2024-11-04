'use client';

import React from 'react';
import { iconsMap } from '../../constantes/iconsMap';
import { FilterSortProps } from '@/types/type';

const FilterSort: React.FC<FilterSortProps> = ({
  type,
  selectedType,
  isUp,
  onClick,
}) => {
  const handleClick = () => {
    onClick(type);
  };

  return (
    <div className="flex flex-col gap-[2px]" onClick={handleClick}>
      {selectedType === type ? (
        isUp ? (
          <iconsMap.IconSortUp className="h-[9px] w-[15px]" />
        ) : (
          <iconsMap.IconSortDown className="h-[9px] w-[15px]" />
        )
      ) : (
        <>
          <iconsMap.IconSortUp className="h-[9px] w-[15px] opacity-50" />
          <iconsMap.IconSortDown className="h-[9px] w-[15px] opacity-50" />
        </>
      )}
    </div>
  );
};

export default FilterSort;
