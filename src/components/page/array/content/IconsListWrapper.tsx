'use client';

import React, { useRef } from 'react';
import { arrayIcone } from '@/constantes/constantes';
import { iconsMap } from '@/constantes/iconsMap';
import { IconsListWrapperProps } from '@/types/type';

const IconsListWrapper: React.FC<IconsListWrapperProps> = ({
  file,
  handleIconClick,
  handleClickOpen,
  handleMouseEnter,
  handleMouseLeave,
  index,
}) => {
  const containerRefs = useRef<HTMLLIElement[]>([]);
  return (
    <>
      <ul className="flex">
        {arrayIcone.map((icon, iconIndex) => {
          const IconComponent =
            icon.type === 'favorite' && file.isFavorite
              ? iconsMap.IconFavorited
              : icon.icon;

          return (
            <li
              key={`icon-${iconIndex}`}
              className="relative hidden w-7 flex-none cursor-pointer px-5 sm:block lg:w-9"
              onClick={() => handleIconClick(icon, file)}
            >
              <IconComponent
                className="text-regular-blue hover:text-dark-blue z-20 size-6 transition-colors duration-300"
                onMouseEnter={(e) =>
                  handleMouseEnter(e, icon.type, 'translate(-40%, -110%)')
                }
                onMouseLeave={handleMouseLeave}
              />
            </li>
          );
        })}
        <li
          className="relative block w-7 flex-none px-5 sm:hidden lg:w-9"
          ref={(el) => {
            if (el) containerRefs.current[index] = el;
          }}
          onClick={(e) => {
            e.preventDefault();
            const rect = containerRefs.current[index].getBoundingClientRect();
            handleClickOpen(e, file.filename, rect, file.id);
          }}
        >
          <iconsMap.IconInfo className="text-regular-blue hover:text-dark-blue size-6 transition-colors duration-300" />
        </li>
      </ul>
    </>
  );
};

export default IconsListWrapper;
