import clsx from 'clsx';
import React, { useCallback, useState } from 'react';
import * as Yup from 'yup';
import { ulpoadFileSchema } from '../../../helpers/validationShema';
import AccordionMenu from '@/components/accordeon/AccordionMenu';
import ButtonModalWrapper from '@/components/button/ButtonModalWrapper';
import useAccordion from '@/hook/ui/useAccordion';
import useModalStore from '@/store/ui/useModale';
import { useFileStore } from '@/store/useFileStore';
import { filteredFolders } from '@/utils/filteredFolders';
import { getFileType } from '@/utils/getFileType';

const UploadFile = () => {
  const { files, createFiles } = useFileStore();

  const {
    fileName,
    checkedFile,
    handleCheck,
    handleChange,
    toggleOpen,
    isOpen,
  } = useAccordion();

  const [errors, setErrors] = useState({
    name: '',
    checkbox: '',
  });

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) {
        handleChange('No file chosen.');
        return;
      }
      const fileName = file.name;
      handleChange(fileName);
    },
    [handleChange]
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await ulpoadFileSchema.validate(
        { name: fileName, checkbox: checkedFile },
        { abortEarly: false }
      );
      const parentId: string = checkedFile ? checkedFile : '';
      const newFolder = {
        filename: fileName,
        parentId,
        type: getFileType(fileName),
      };
      await createFiles(newFolder);
      useModalStore.getState().closeModal();
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const fieldErrors = error.inner.reduce<{ [key: string]: string }>(
          (acc, err) => {
            if (err.path) acc[err.path] = err.message;
            return acc;
          },
          { name: '', checkbox: '' }
        );
        setErrors((prev) => ({ ...prev, ...fieldErrors }));
      } else {
        console.error('Upload failed:', error);
        setErrors((prev) => ({ ...prev, general: 'Failed to upload' }));
      }
    }
  };

  const browseClass = clsx(
    'file:border-darkest-blue file:text-darkest-blue file:cursor-pointer',
    'hover:file:bg-light-blue file:rounded-lg file:border file:bg-white',
    'file:font-regular file:mr-3 file:px-2 file:py-1 file:duration-500 file:ease-in-out file:sm:mr-5 file:sm:px-3 file:sm:py-1.5 file:sm:font-semibold'
  );

  return (
    <div className="h-full">
      <h1 className="text-darkest-blue text-titleSmall sm:text-title pb-4 text-center sm:pb-7">
        Upload a document
      </h1>
      <form action="submit" className="w-full">
        <div className="flex w-full flex-col gap-2 pb-4 sm:pb-6">
          <label htmlFor="file">Browse your file:</label>
          <input
            type="file"
            onChange={handleFileChange}
            className={browseClass}
          />
          <span className="text-error-red text-sm">{errors.name}</span>
        </div>
        <div>
          <AccordionMenu
            files={files && files.length > 0 ? filteredFolders(files) : []}
            handleCheck={handleCheck}
            checkedFile={checkedFile}
            toggleOpen={toggleOpen}
            isOpen={isOpen}
          />
          <span className="text-error-red text-sm">{errors.checkbox}</span>
        </div>
        <ButtonModalWrapper
          actionLabel="Upload"
          handleAction={(e: React.FormEvent<HTMLFormElement>) =>
            handleSubmit(e)
          }
        />
      </form>
    </div>
  );
};

export default UploadFile;
