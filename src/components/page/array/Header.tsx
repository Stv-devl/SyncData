'use client';

import clsx from 'clsx';
import React, { useCallback, useMemo } from 'react';
import { twMerge } from 'tailwind-merge';
import { arrayIcone } from '../../../constantes/constantes';
import FilterSort from '@/components/sort/FilterSort';
import usePopupStore from '@/store/ui/usePopup';
import { useFileStore } from '@/store/useFileStore';
import { FileType, HeaderProps } from '@/types/type';

const Header: React.FC<HeaderProps> = ({ isList, setFilesChecked }) => {
  const { handleMouseEnter, handleMouseLeave } = usePopupStore();
  const { displayFiles, filterTools, setFilterTools } = useFileStore();

  const { headerType, upselected } = filterTools;

  const isCheckedAll = useMemo(() => {
    return (
      displayFiles &&
      displayFiles.length > 0 &&
      displayFiles.every((file) => file.isChecked)
    );
  }, [displayFiles]);

  const handleCheckAll = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const isChecked = e.target.checked;
      setFilesChecked(isChecked);
    },
    [setFilesChecked]
  );

  const handleSortFilter = useCallback(
    (type: string | null) => {
      if (headerType === type) {
        setFilterTools({
          ...filterTools,
          upselected: !upselected,
        });
      } else {
        setFilterTools({
          ...filterTools,
          headerType: type as keyof FileType,
          upselected: true,
        });
      }
    },
    [headerType, upselected, filterTools, setFilterTools]
  );

  return (
    <ul className="flex items-center px-[7px] pb-3 lg:px-6">
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
            name="checkAll"
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
            selectedType={headerType ?? null}
            isUp={upselected ?? null}
            onClick={handleSortFilter}
          />
        </div>
      </li>
      <li className="hidden w-28 cursor-pointer px-0  sm:block lg:w-32 lg:px-2">
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
            selectedType={headerType ?? null}
            isUp={upselected ?? null}
            onClick={handleSortFilter}
          />
        </div>
      </li>
      {isList && (
        <li className="w-25 hidden px-[10px] sm:block lg:w-32 lg:px-2">
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
