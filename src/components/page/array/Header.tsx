'use client';

import React from 'react';
import { arrayIcone, icones } from '../../../constantes/constantes';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import usePopupStore from '@/store/usePopup';
import { HeaderProps } from '@/types/type';

const Header: React.FC<HeaderProps> = ({ isList }) => {
  const { handleMouseEnter, handleMouseLeave } = usePopupStore();

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
          <input type="checkbox" className="size-5" />
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
          <icones.IconSort />
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
          <icones.IconSort />
        </div>
      </li>
      {isList && (
        <li className="w-25 hidden px-2 sm:block lg:w-32">
          <span>Access</span>
        </li>
      )}
      <>
        {isList &&
          arrayIcone.map((icone, index) => (
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
