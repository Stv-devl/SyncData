import React, { useEffect, useRef } from 'react';
import { arrayHeader, arrayIcone } from '@/constantes/constantes';
import { headerClass } from '@/utils/headerClass';
import { iconsMap } from '@/constantes/iconsMap';
import { ArrayContentProps } from '@/types/type';
import IconWrapper from '../../../wrapper/IconFileWrapper';
import usePopupStore from '@/store/usePopup';

import useManageFonctions from '@/hook/manage/useManageFonctions';

const ListContent: React.FC<ArrayContentProps> = ({ files }) => {
  const {
    isOpen,
    handleMouseEnter,
    handleClickOpen,
    handleMouseLeave,
    handleClickClose,
  } = usePopupStore();

  const { getActionByType } = useManageFonctions();

  const containerRefs = useRef<HTMLLIElement[]>([]);

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('click', handleClickClose);
    } else {
      window.removeEventListener('click', handleClickClose);
    }
    return () => {
      window.removeEventListener('click', handleClickClose);
    };
  }, [isOpen, handleClickClose]);

  return (
    <>
      {files &&
        files.map((file, indexfiles) => (
          <ul
            key={file.filename}
            className="hover:bg-light-blue flex h-16 w-full cursor-pointer items-center px-3 transition-colors duration-500 lg:px-6"
            onContextMenu={(e) => {
              e.preventDefault();
              const rect = {
                x: e.clientX,
                y: e.clientY,
              };
              handleClickOpen(e, file.filename, rect);
            }}
          >
            {arrayHeader.map((item) => (
              <li key={item.name} className={headerClass(item.name)}>
                <div className="flex items-center gap-1">
                  {item.name === 'checked' ? (
                    <input
                      type="checkbox"
                      className="border-dark-gray size-5 border-2"
                    />
                  ) : item.name === 'filename' ? (
                    <>
                      <IconWrapper type={file.type} className="size-8" />
                      <span>
                        {String(file[item.name as keyof typeof file])}
                      </span>
                    </>
                  ) : (
                    <span>{String(file[item.name as keyof typeof file])}</span>
                  )}
                </div>
              </li>
            ))}
            {arrayIcone &&
              arrayIcone.map((icon, index) => (
                <li
                  key={`icone${index}`}
                  className="relative hidden w-7 flex-none px-5 sm:block lg:w-9"
                  onClick={() => getActionByType(icon.type)}
                >
                  <icon.icon
                    className="text-regular-blue hover:text-dark-blue size-6 transition-colors duration-300"
                    onMouseEnter={(e) =>
                      handleMouseEnter(e, icon.type, 'translate(-40%, -110%)')
                    }
                    onMouseLeave={handleMouseLeave}
                  />
                </li>
              ))}
            <li
              className="relative block w-7 flex-none px-5 sm:hidden lg:w-9"
              ref={(el) => {
                if (el) containerRefs.current[indexfiles] = el;
              }}
              onClick={(e) => {
                e.preventDefault();
                const rect =
                  containerRefs.current[indexfiles].getBoundingClientRect();
                handleClickOpen(e, file.filename, rect);
              }}
            >
              <iconsMap.IconInfo className="text-regular-blue hover:text-dark-blue size-6 transition-colors duration-300" />
            </li>
          </ul>
        ))}
    </>
  );
};

export default ListContent;
