import React, { useRef } from 'react';
import { arrayIcone } from '@/constantes/constantes';
import { iconsMap } from '@/constantes/iconsMap';
import { IconsListWrapperProps } from '@/types/type';

/**
 * IconsListWrapper component that displays a list of icons for a file
 * @component
 * @param {IconsListWrapperProps} props - The properties for the IconsListWrapper component
 * @returns {JSX.Element} The rendered IconsListWrapper component with a list of icons
 */
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
              className="relative hidden w-7 flex-none cursor-pointer px-[16px] sm:block lg:w-9 lg:px-5"
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
          <iconsMap.IconInfo className="text-regular-blue hover:text-dark-blue size-6 cursor-pointer transition-colors duration-300" />
        </li>
      </ul>
    </>
  );
};

export default IconsListWrapper;
