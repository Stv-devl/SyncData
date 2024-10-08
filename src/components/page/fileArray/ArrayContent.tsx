import React from 'react';
import { arrayHeader, arrayIcone } from '@/constantes/constantes';
import { headerClass } from '@/utils/headerClass';
import { icones } from '@/constantes/constantes';
import { ArrayContentProps } from '@/types/type';

const ArrayContent: React.FC<ArrayContentProps> = ({ file }) => {
  return (
    <ul className="bg-lightest-gray flex h-16 w-full cursor-pointer items-center px-3 lg:px-6">
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
                <icones.IconFiles className="size-8" />
                <span>{file[item.name as keyof typeof file]}</span>
              </>
            ) : (
              <span>{file[item.name as keyof typeof file]}</span>
            )}
          </div>
        </li>
      ))}
      {arrayIcone.map((icone, index) => (
        <li
          key={`icone${index}`}
          className="hidden w-7 flex-none px-5 sm:block lg:w-9"
        >
          <icone.icon className="text-regular-blue hover:text-dark-blue size-6 transition-colors duration-300" />
        </li>
      ))}
      <li className="block w-7 flex-none px-5 sm:hidden lg:w-9">
        <icones.IconInfo className="text-regular-blue hover:text-dark-blue size-6 transition-colors duration-300" />
      </li>
    </ul>
  );
};

export default ArrayContent;
