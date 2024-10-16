import React, { useCallback, useState } from 'react';
import { files } from '@/constantes/files';
import AccordionMenu from '@/components/accordeon/AccordionMenu';
import { filteredFiles } from '@/utils/filteredFiles';
import ButtonModalWrapper from '@/components/button/ButtonModalWrapper';
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
    <div className="h-full ">
      <h1 className="text-darkest-blue text-titleSmall sm:text-title pb-4 text-center sm:pb-7 ">
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
        <ButtonModalWrapper
          actionLabel="Upload"
          handleAction={(e) => handleUpload(e)}
        />
      </form>
    </div>
  );
};

export default UploadFile;
