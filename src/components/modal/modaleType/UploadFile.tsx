import React, { useCallback, useState } from 'react';
import clsx from 'clsx';
import AccordionMenu from '@/components/accordeon/AccordionMenu';
import ButtonModalWrapper from '@/components/button/ButtonModalWrapper';
import useManageChecked from '@/hook/manage/useManageChecked';
import { filteredFolders } from '@/utils/filteredFolders';
import { ulpoadFileSchema } from '../../../utils/validationShema';
import useModalStore from '@/store/useModale';
import { useUserStore } from '@/store/useUserStore';
import * as Yup from 'yup';
import { getFileType } from '@/utils/getFileType';

const UploadFile = () => {
  const { files, createFiles } = useUserStore();

  const { fileName, setFileName, checkedFile, handleCheck } =
    useManageChecked();

  const [errors, setErrors] = useState({
    name: '',
    checkbox: '',
  });

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) {
        setFileName('No file chosen.');
        return;
      }
      const fileName = file.name;
      setFileName(fileName);
    },
    [setFileName]
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
        name: fileName,
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
        console.error('Login failed:', error);
        setErrors((prev) => ({ ...prev, general: 'Failed to log in' }));
      }
    }
  };

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
          <span className="text-error-red text-sm">{errors.name}</span>
        </div>
        <div>
          <AccordionMenu
            files={files && files.length > 0 ? filteredFolders(files) : []}
            handleCheck={handleCheck}
            checkedFile={checkedFile}
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
