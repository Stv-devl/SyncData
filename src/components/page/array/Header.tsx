'use client';

import clsx from 'clsx';
import React, { useCallback, useMemo, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { arrayIcone } from '../../../constantes/constantes';
import FilterSort from '@/components/sort/FilterSort';
import useManageFilter from '@/hook/manage/useManageFilter';
import usePopupStore from '@/store/ui/usePopup';
import { useFileStore } from '@/store/useFileStore';
import { FileType, HeaderProps } from '@/types/type';

const Header: React.FC<HeaderProps> = ({ isList, setAllFilesChecked }) => {
  const { handleMouseEnter, handleMouseLeave } = usePopupStore();
  const { files } = useFileStore();

  const [isActive, setIsActive] = useState(false);
  const { filterTools, handleChange } = useManageFilter(isActive);

  const isCheckedAll = useMemo(() => {
    return files && files.length > 0 && files.every((file) => file.isChecked);
  }, [files]);

  const handleCheckAll = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const isChecked = e.target.checked;
      setAllFilesChecked(isChecked);
    },
    [setAllFilesChecked]
  );

  const handleSortFilter = useCallback(
    (type: string | null) => {
      if (!isActive) {
        setIsActive(true);
      }
      if (filterTools.headerType === type) {
        handleChange({ upselected: !filterTools.upselected });
      } else {
        const newHeaderType = (type as keyof FileType) || null;
        handleChange({
          upselected: true,
          headerType: newHeaderType,
        });
      }
    },
    [filterTools, handleChange, isActive]
  );
  return (
    <ul className="flex items-center px-3 pb-3 lg:px-6">
      <li className="w-10 flex-none cursor-pointer px-2 lg:w-16">
        <div
          className="flex items-center"
          onMouseEnter={(e) =>
            handleMouseEnter(e, 'Check all', 'translate(-30%, -115%)')
          }
          onMouseLeave={handleMouseLeave}
        >
          <input
            type="checkbox"
            className="size-5"
            checked={isCheckedAll ?? false}
            onChange={handleCheckAll}
          />
        </div>
      </li>
      <li className={twMerge(clsx(isList && 'grow', 'cursor-pointer px-2'))}>
        <div
          className="flex items-center gap-3"
          onMouseEnter={(e) =>
            handleMouseEnter(e, 'Sort by name', 'translate(-10%, -115%)')
          }
          onMouseLeave={handleMouseLeave}
        >
          <span>Name</span>
          <FilterSort
            type="filename"
            selectedType={filterTools.headerType}
            isUp={filterTools.upselected}
            onClick={handleSortFilter}
          />
        </div>
      </li>
      <li className="w-25 hidden cursor-pointer px-2 sm:block lg:w-32">
        <div
          className="flex items-center gap-3"
          onMouseEnter={(e) =>
            handleMouseEnter(e, 'Sort by date', 'translate(0%, -115%)')
          }
          onMouseLeave={handleMouseLeave}
        >
          <span>Modified</span>
          <FilterSort
            type="modified"
            selectedType={filterTools.headerType}
            isUp={filterTools.upselected}
            onClick={handleSortFilter}
          />
        </div>
      </li>
      {isList && (
        <li className="w-25 hidden px-2 sm:block lg:w-32">
          <span>Access</span>
        </li>
      )}
      <>
        {isList &&
          arrayIcone.map((icon, index) => (
            <li
              key={'header-icon-' + index}
              className="hidden w-7 flex-none px-5 sm:block lg:w-9"
            ></li>
          ))}
      </>
    </ul>
  );
};

export default Header;
