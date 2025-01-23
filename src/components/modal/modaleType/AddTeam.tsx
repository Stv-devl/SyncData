import React, { ChangeEvent, FormEvent } from 'react';
import ButtonModalWrapper from '@/components/button/ButtonModalWrapper';
import Input from '@/components/form/Input';
import { iconsMap } from '@/constantes/iconsMap';
import { ModaleFileProps } from '@/types/type';

const AddTeam: React.FC<ModaleFileProps> = () => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    console.log(e.target.value);
  };

  const handleAdd = (e: FormEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    console.log('add');
  };

  return (
    <div className="h-full ">
      <h1 className="text-title text-darkest-blue mb-8 text-center">
        Add a team member
      </h1>
      <div className="flex w-full flex-col gap-6">
        <div className="flex w-full flex-col gap-1.5">
          <label>Add a team member :</label>
          <Input
            name="name"
            type="text"
            value=""
            placeholder="Team member username or email"
            handleChange={(e) => handleChange(e)}
            autoComplete="off"
            error=""
            IconComponent={iconsMap.IconSearch}
          />
        </div>
        <div className="flex items-center justify-center">
          <div className="border-regular-gray grow border-t"></div>
          <span className="mx-4">Or</span>
          <div className="border-regular-gray grow border-t"></div>
        </div>
        <div className="mb-5 flex w-full flex-col gap-1.5">
          <label>Ask a team member to join :</label>
          <Input
            name="name"
            type="text"
            value=""
            placeholder="Write an email"
            handleChange={(e) => handleChange(e)}
            autoComplete="off"
            error=""
            IconComponent={iconsMap.IconSearch}
          />
        </div>
      </div>
      <ButtonModalWrapper
        actionLabel="Share"
        handleAction={(e) => handleAdd(e as React.FormEvent<HTMLButtonElement>)}
      />
    </div>
  );
};

export default AddTeam;
