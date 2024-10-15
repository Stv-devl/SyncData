import React, { useCallback, useState } from 'react';
import { files } from '@/constantes/files';
import useModalStore from '@/store/useModale';
import AccordionMenu from '@/components/accordeon/AccordionMenu';
import Button from '@/components/button/Button';
import { filteredFiles } from '@/utils/filteredFiles';
import clsx from 'clsx';

const UploadFile = () => {
  const [fileContent, setFileContent] = useState('');

  const handleUpload = (e) => {
    e.preventDefault();
    console.log('upload');
  };

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) {
        setFileContent('No file chosen.');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result;
        if (typeof result === 'string') {
          setFileContent(result);
        }
      };
      reader.readAsText(file);
    },
    []
  );

  const browseClass = clsx(
    'file:border-darkest-blue file:text-darkest-blue file:cursor-pointer',
    'hover:file:bg-light-blue file:rounded-lg file:border file:bg-white',
    'file:font-regular file:mr-3 file:px-2 file:py-1 file:duration-500 file:ease-in-out file:sm:mr-5 file:sm:px-3 file:sm:py-1.5 file:sm:font-semibold'
  );
  return (
    <>
      <h1 className="text-darkest-blue text-titleSmall sm:text-title pb-4 sm:pb-7 ">
        Upload a document
      </h1>
      <form action="submit" className="w-full">
        <div className="flex w-full flex-col gap-2 pb-4 sm:pb-6">
          <label htmlFor="file">Browse your file :</label>
          <input
            type="file"
            onChange={handleFileChange}
            className={browseClass}
          />
        </div>
        <AccordionMenu files={filteredFiles(files)} />
        <div className="flex justify-between">
          <div className="mt-5 h-[35px] w-[120px]">
            <Button
              label={'Cancel'}
              color={'empty'}
              type={'submit'}
              onClick={() => useModalStore.getState().closeModal()}
            />
          </div>
          <div className="mt-5 h-[35px] w-[120px]">
            <Button
              label={'Upload'}
              color={'full'}
              type={'submit'}
              onClick={(e) => handleUpload(e)}
            />
          </div>
        </div>
      </form>
    </>
  );
};

export default UploadFile;
