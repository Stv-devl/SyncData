import React, { useState } from 'react';
import * as Yup from 'yup';
import AccordionMenu from '@/components/accordeon/AccordionMenu';
import ButtonModalWrapper from '@/components/button/ButtonModalWrapper';
import Input from '@/components/form/Input';
import { generateId } from '@/helpers/generateId';
import { getCurrentDate } from '@/helpers/getCurrentDate';
import { createFolderSchema } from '@/helpers/validationShema';
import useAccordion from '@/hook/ui/useAccordion';
import useModalStore from '@/store/ui/useModale';
import { useFileStore } from '@/store/useFileStore';
import { ModaleFileProps } from '@/types/type';
import { filteredFolders } from '@/utils/filteredFolders';

/**
 * CreateFolder component that allows users to create a new folder
 * @component
 * @param {ModaleFileProps} props - The properties for the CreateFolder component
 * @returns {JSX.Element} The rendered CreateFolder form with input fields and validation
 */
const CreateFolder: React.FC<ModaleFileProps> = () => {
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await createFolderSchema.validate(
        { name: fileName, checkbox: checkedFile },
        { abortEarly: false }
      );

      const parentId: string = checkedFile ? checkedFile : '';

      const newFolder = {
        id: generateId(),
        filename: fileName,
        type: 'folder',
        url: '',
        file: null,
        files: [],
        acces: 'only you',
        modified: getCurrentDate(),
      };

      await createFiles(newFolder, parentId, true);
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

  return (
    <div className="h-full">
      <h1 className="text-darkest-blue text-titleSmall sm:text-title pb-4 text-center sm:pb-7">
        Create a folder
      </h1>
      <form action="submit" className="w-full">
        <div className="mb-5 flex flex-col gap-0.5">
          <label htmlFor="name">Name your folder:</label>
          <Input
            name="name"
            type="text"
            value={fileName}
            placeholder="Write the name of your folder"
            handleChange={handleChange}
            autoComplete="off"
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
          actionLabel="Create"
          handleAction={(e) =>
            handleSubmit(e as React.FormEvent<HTMLFormElement>)
          }
        />
      </form>
    </div>
  );
};

export default CreateFolder;
