import React from 'react';
import { arrayPopup } from '@/constantes/constantes';
import useManageFonctions from '@/hook/manage/useManageFonctions';
import { InfoWrapperProps } from '@/types/type';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';

const InfoWrapper: React.FC<InfoWrapperProps> = ({ fileName }) => {
  const { getActionByType } = useManageFonctions();

  return (
    <div className="flex flex-col items-center">
      <div className="text-darkest-blue border-regular-gray w-[160px] truncate border-b p-3 text-center font-semibold capitalize">
        {fileName}
      </div>
      {arrayPopup.map((item) => (
        <div
          key={item.label}
          className="hover:bg-light-blue flex w-full cursor-pointer items-center gap-2 p-2 transition-colors duration-500 lg:gap-4"
          onClick={() => getActionByType(item.type)}
        >
          <item.icon
            className={twMerge(
              'group-hover:text-regular-blue text-darkest-blue transition-colors duration-300',
              clsx(item.label === 'Information' ? 'ml-0.5 size-5' : 'size-6')
            )}
          />
          <span className="text-darkest-blue">{item.label}</span>
        </div>
      ))}
    </div>
  );
};

export default InfoWrapper;
