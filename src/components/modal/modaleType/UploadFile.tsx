import clsx from 'clsx';
import React, { useCallback, useState } from 'react';
import * as Yup from 'yup';
import { ulpoadFileSchema } from '../../../helpers/validationShema';
import AccordionMenu from '@/components/accordeon/AccordionMenu';
import ButtonModalWrapper from '@/components/button/ButtonModalWrapper';
import { generateId } from '@/helpers/generateId';
import { getCurrentDate } from '@/helpers/getCurrentDate';
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

  const { openModal, closeModal } = useModalStore();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<{ name: string; checkbox: string }>({
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
      setSelectedFile(file);
      handleChange(file.name);
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

      if (!selectedFile) {
        throw new Error('No file selected.');
      }

      const fileUrl = selectedFile ? URL.createObjectURL(selectedFile) : '';

      const newFile = {
        id: generateId(),
        filename: fileName,
        type: getFileType(fileName),
        url: fileUrl,
        file: selectedFile as File,
        files: [],
        acces: 'only you',
        modified: getCurrentDate(),
      };

      createFiles(newFile);
      closeModal();
      openModal('UploadLoader', newFile.id, newFile.filename);

      setTimeout(() => {
        URL.revokeObjectURL(fileUrl);
      }, 10000);
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
        <ButtonModalWrapper actionLabel="Upload" handleAction={handleSubmit} />
      </form>
    </div>
  );
};

export default UploadFile;
