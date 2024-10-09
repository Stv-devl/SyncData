'use client';

import React from 'react';
import { arrayIcone, icones } from '../../../constantes/constantes';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

const Header = ({ isList }) => {
  return (
    <ul className="flex items-center px-3 pb-3 lg:px-6">
      <li className="w-10 flex-none px-2 lg:w-16">
        <div className="flex items-center">
          <input type="checkbox" className="size-5" />
        </div>
      </li>
      <li className={twMerge(clsx(isList && 'grow', 'px-2'))}>
        <div className="flex items-center gap-3">
          <span>Name</span>
          <icones.IconSort />
        </div>
      </li>
      <li className="w-25 hidden px-2 sm:block lg:w-32">
        <div className="flex items-center gap-3">
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
