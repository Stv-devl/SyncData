import React, { useCallback } from 'react';
import { arrayPopup } from '@/constantes/constantes';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import { InfoWrapperProps } from '@/types/type';

const InfoWrapper: React.FC<InfoWrapperProps> = ({ fileName }) => {
  const handleInformation = () => {
    console.log('information');
  };

  const handleDownload = () => {
    console.log('download');
  };

  const handleShare = () => {
    console.log('share');
  };

  const handleDelete = () => {
    console.log('delete');
  };
  const handleFavorite = () => {
    console.log('favorite');
  };

  const handleMoveFile = () => {
    console.log('move file');
  };

  const handleChangeName = () => {
    console.log('change name');
  };

  const getActionByType = useCallback((label: string) => {
    switch (label) {
      case 'Information':
        return handleInformation;
      case 'Favorite':
        return handleFavorite;
      case 'Share link':
        return handleShare;
      case 'Download':
        return handleDownload;
      case 'Move file':
        return handleMoveFile;
      case 'Change name':
        return handleChangeName;
      case 'Delete':
        return handleDelete;
      default:
        return () => {};
    }
  }, []);

  return (
    <div className="flex flex-col items-center">
      <div className="text-darkest-blue border-regular-gray w-[160px] truncate border-b p-3 text-center font-semibold capitalize">
        {fileName}
      </div>
      {arrayPopup.map((item) => (
        <div
          key={item.label}
          className="hover:bg-light-blue flex w-full cursor-pointer items-center gap-2 p-2 transition-colors duration-500 lg:gap-4"
          onClick={getActionByType(item.label)}
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
