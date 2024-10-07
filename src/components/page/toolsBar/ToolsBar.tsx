import Button from '@/components/button/Button';
import { icones } from '@/constantes/constantes';
import React from 'react';

const ToolsBar = () => {
  const isSelected = true;

  const handleUpload = () => {
    console.log('upload');
  };

  const handleAddFile = () => {
    console.log('add file');
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

  return (
    <section className="mx-auto flex h-[90px] w-full items-center justify-center rounded-lg bg-white px-2 sm:justify-start sm:px-4 md:px-10 ">
      <div className="flex items-center gap-10 sm:gap-4 md:gap-8">
        <div className="hidden h-9 items-center text-sm sm:flex ">
          <Button
            label={'Upload'}
            IconComponent={icones.IconUpload}
            color={'full'}
            onClick={handleUpload}
            iconColor={'#FFFFFF'}
          />
        </div>
        <div
          className="group mt-1 flex cursor-pointer sm:hidden"
          onClick={handleUpload}
        >
          <icones.IconUpload className="group-hover:fill-regular-blue text-darkest-blue size-7 fill-current transition-colors duration-300" />
        </div>

        <div className="hidden h-9 items-center text-sm sm:flex">
          <Button
            label={'Create a file'}
            IconComponent={icones.IconAddFile}
            color={'empty'}
            onClick={handleAddFile}
            iconColor={'#08396F'}
          />
        </div>
        <div
          className="group mt-1 flex cursor-pointer sm:hidden"
          onClick={handleAddFile}
        >
          <icones.IconAddFile className="group-hover:text-regular-blue text-darkest-blue mt-1 size-7 fill-current transition-colors duration-300" />
        </div>
        {isSelected && (
          <>
            <div className="hidden h-9 items-center text-sm sm:flex">
              <Button
                label={'Download'}
                IconComponent={icones.IconDownload}
                color={'full'}
                onClick={handleDownload}
                iconColor={'#FFFFFF'}
              />
            </div>
            <div
              className="group flex cursor-pointer items-center sm:hidden"
              onClick={handleDownload}
            >
              <icones.IconDownload className="group-hover:text-regular-blue text-darkest-blue mt-1 size-8 transition-colors duration-300" />
            </div>
            <div className="hidden h-9 items-center text-sm sm:flex">
              <Button
                label={'Share'}
                IconComponent={icones.IconShare}
                color="empty"
                onClick={handleShare}
              />
            </div>
            <div
              className="group flex cursor-pointer sm:hidden"
              onClick={handleShare}
            >
              <icones.IconShare className="group-hover:text-regular-blue text-darkest-blue mt-1 size-7 transition-colors duration-300 " />
            </div>
            <div className="hidden h-9 text-sm sm:flex">
              <Button
                label={'Delete'}
                IconComponent={icones.IconDelete}
                color="full"
                onClick={handleDelete}
              />
            </div>
            <div
              className="group mt-1 flex cursor-pointer items-center sm:hidden"
              onClick={handleDelete}
            >
              <icones.IconDelete className="group-hover:text-regular-blue text-darkest-blue size-7 transition-colors duration-300" />
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default ToolsBar;
