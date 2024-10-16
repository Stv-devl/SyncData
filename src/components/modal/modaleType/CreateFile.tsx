import AccordionMenu from '@/components/accordeon/AccordionMenu';
import ButtonModalWrapper from '@/components/button/ButtonModalWrapper';
import Input from '@/components/form/Input';
import { files } from '@/constantes/files';
import { filteredFiles } from '@/utils/filteredFiles';
import React from 'react';

const CreateFile = () => {
  const handleCreateFile = (e) => {
    e.preventDefault();
    console.log('Create');
  };

  const handleChange = (e) => {
    console.log(e.target.value);
  };

  return (
    <div className="h-full ">
      <h1 className="text-darkest-blue text-titleSmall sm:text-title pb-4 text-center sm:pb-7 ">
        Create a document
      </h1>
      <form action="submit" className="w-full">
        <div className="mb-5 flex flex-col gap-0.5">
          <label htmlFor="name">Name your file :</label>
          <Input
            name="name"
            type="text"
            value=""
            placeholder="Write the name of your file"
            handleChange={(e) => handleChange(e)}
            autoComplete="off"
            error=""
          />
        </div>
        <AccordionMenu files={filteredFiles(files)} />
        <ButtonModalWrapper
          actionLabel="Create"
          handleAction={(e) => handleCreateFile(e)}
        />
      </form>
    </div>
  );
};

export default CreateFile;
