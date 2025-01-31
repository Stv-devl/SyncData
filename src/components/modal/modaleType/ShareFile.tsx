import React from 'react';
import ButtonModalWrapper from '@/components/button/ButtonModalWrapper';
import Input from '@/components/form/Input';
import { iconsMap } from '@/constantes/iconsMap';
import { ModaleFileProps } from '@/types/type';

const ShareFile: React.FC<ModaleFileProps> = () => {
  const handleShare = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('share');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('change', e.target.name, e.target.value);
  };

  return (
    <div className="h-full ">
      <h1 className="text-title text-darkest-blue mb-8 text-center">
        Share your file
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
          <label>Send the link through email :</label>
          <Input
            name="name"
            type="text"
            value=""
            placeholder="Write an email"
            handleChange={(e) =>
              handleChange(e as React.ChangeEvent<HTMLInputElement>)
            }
            autoComplete="off"
            error=""
            IconComponent={iconsMap.IconSearch}
          />
        </div>
      </div>
      <ButtonModalWrapper
        actionLabel="Share"
        handleAction={(e) => handleShare(e as React.FormEvent<HTMLFormElement>)}
      />
    </div>
  );
};

export default ShareFile;
