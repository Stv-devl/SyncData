'use client';

import { arrayHeader, arrayIcone } from '../../../constantes/constantes';
import { headerClass } from '@/utils/headerClass';
import React from 'react';

const ArrayHeader = () => {
  return (
    <ul className="flex items-center px-3 pb-3 lg:px-6">
      {arrayHeader.map((item, index) => (
        <li key={index} className={headerClass(item.name)}>
          <div className="flex items-center gap-3">
            {item.name === 'checked' ? (
              <input type="checkbox" className="size-5" />
            ) : (
              <>
                <span>{item.label}</span>
                {item.icon && <item.icon />}
              </>
            )}
          </div>
        </li>
      ))}

      {arrayIcone.length > 0 &&
        arrayIcone.map((icone, index) => (
          <li
            key={'header-icon-' + index}
            className="hidden w-7 flex-none px-5 sm:block lg:w-9"
          ></li>
        ))}
    </ul>
  );
};

export default ArrayHeader;
