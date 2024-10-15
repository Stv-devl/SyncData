import React, { useEffect, useRef } from 'react';
import { arrayHeader, arrayIcone } from '@/constantes/constantes';
import { headerClass } from '@/utils/headerClass';
import { icones } from '@/constantes/constantes';
import { ArrayContentProps } from '@/types/type';
import IconWrapper from '../../../../utils/IconFileWrapper';
import usePopupStore from '@/store/usePopup';

const ListContent: React.FC<ArrayContentProps> = ({ files }) => {
  const {
    isOpen,
    handleMouseEnter,
    handleClickOpen,
    handleMouseLeave,
    handleClickClose,
  } = usePopupStore();

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
                      <span>{file[item.name as keyof typeof file]}</span>
                    </>
                  ) : (
                    <span>{file[item.name as keyof typeof file]}</span>
                  )}
                </div>
              </li>
            ))}
            {arrayIcone &&
              arrayIcone.map((icone, index) => (
                <li
                  key={`icone${index}`}
                  className="relative hidden w-7 flex-none px-5 sm:block lg:w-9"
                >
                  <icone.icon
                    className="text-regular-blue hover:text-dark-blue size-6 transition-colors duration-300"
                    onMouseEnter={(e) =>
                      handleMouseEnter(e, icone.label, 'translate(-40%, -110%)')
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
              <icones.IconInfo className="text-regular-blue hover:text-dark-blue size-6 transition-colors duration-300" />
            </li>
          </ul>
        ))}
    </>
  );
};

export default ListContent;
