import React, { useState } from 'react';
import AccordionMenu from '@/components/accordeon/AccordionMenu';
import ButtonModalWrapper from '@/components/button/ButtonModalWrapper';
import Input from '@/components/form/Input';
import useManageChecked from '@/hook/manage/useManageChecked';
import { useUserStore } from '@/store/useUserStore';
import useModalStore from '@/store/useModale';
import { filteredFiles } from '@/utils/filteredFiles';
import { createFolderSchema } from '@/utils/validationShema';
import * as Yup from 'yup';

const CreateFolder = () => {
  const { user, createFolder } = useUserStore();
  const { fileName, checkedFile, handleCheck, handleChange } =
    useManageChecked();

  const files = user ? user.files : [];

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
      const newFolder = { name: fileName, parentId };
      await createFolder(newFolder);
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
    <div className="h-full ">
      <h1 className="text-darkest-blue text-titleSmall sm:text-title pb-4 text-center sm:pb-7 ">
        Create a folder
      </h1>
      <form action="submit" className="w-full">
        <div className="mb-5 flex flex-col gap-0.5">
          <label htmlFor="name">Name your folder :</label>
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
            files={filteredFiles(files)}
            handleCheck={handleCheck}
            checkedFile={checkedFile}
          />
          <span className="text-error-red text-sm">{errors.checkbox}</span>
        </div>
        <ButtonModalWrapper actionLabel="Create" handleAction={handleSubmit} />
      </form>
    </div>
  );
};

export default CreateFolder;
