import React from 'react';
import { arrayHeader, arrayIcone } from '@/constantes/constantes';
import { headerClass } from '@/utils/headerClass';
import { icones } from '@/constantes/constantes';
import { ArrayContentProps } from '@/types/type';
import IconWrapper from '../wrapper/IconWrapper';
import usePopupStore from '@/store/usePopup';
import Popup from '@/components/popup/Popup';

const ListContent: React.FC<ArrayContentProps> = ({ testFile }) => {
  const { openPopup, closePopup } = usePopupStore();

  const handleMouseEnter = (event: React.MouseEvent, label: string) => {
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    const x = rect.left;
    const y = rect.top;

    openPopup(label, x, y);
  };

  return (
    <>
      {testFile &&
        testFile.map((file) => (
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
                    onMouseEnter={(e) => handleMouseEnter(e, icone.label)}
                    onMouseLeave={() => closePopup()}
                  />
                </li>
              ))}
            <li className="relative block w-7 flex-none px-5 sm:hidden lg:w-9">
              <icones.IconInfo
                className="text-regular-blue hover:text-dark-blue size-6 transition-colors duration-300"
                onMouseEnter={(e) => handleMouseEnter(e, 'Info')}
                onMouseLeave={() => closePopup()}
              />
            </li>
          </ul>
        ))}
      <Popup />
    </>
  );
};

export default ListContent;
