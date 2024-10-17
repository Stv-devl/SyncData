import React, { useCallback } from 'react';
import clsx from 'clsx';
import AccordionMenu from '@/components/accordeon/AccordionMenu';
import { filteredFiles } from '@/utils/filteredFiles';
import ButtonModalWrapper from '@/components/button/ButtonModalWrapper';
import { useUserStore } from '@/store/useUserStore';
import useManageChecked from '@/hook/manage/useManageChecked';

const UploadFile = () => {
  const { userFiles } = useUserStore();

  const { fileName, setFileName, checkedFile, handleCheck } =
    useManageChecked();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (checkedFile) {
      console.log('Create a file', { fileName, checkedFile });
    } else {
      console.log('Aucun fichier sélectionné.');
    }
  };

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) {
        setFileName('No file chosen.');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result;
        if (typeof result === 'string') {
          setFileName(result);
        }
      };
      reader.readAsText(file);
    },
    [setFileName]
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
        <AccordionMenu
          files={filteredFiles(userFiles)}
          handleCheck={handleCheck}
          checkedFile={checkedFile}
        />
        <ButtonModalWrapper
          actionLabel="Upload"
          handleAction={(e) => handleSubmit(e)}
        />
      </form>
    </div>
  );
};

export default UploadFile;
