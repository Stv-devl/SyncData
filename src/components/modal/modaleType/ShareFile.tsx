import ButtonModalWrapper from '@/components/button/ButtonModalWrapper';
import Input from '@/components/form/Input';
import { iconsMap } from '@/constantes/iconsMap';
import React from 'react';

const ShareFile = () => {
  const handleShare = (e) => {
    e.preventDefault();
    console.log('share');
  };

  const handleChange = (e) => {
    console.log(e.target.value);
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
            handleChange={(e) => handleChange(e)}
            autoComplete="off"
            error=""
            IconComponent={iconsMap.IconSearch}
          />
        </div>
      </div>
      <ButtonModalWrapper
        actionLabel="Share"
        handleAction={(e) => handleShare(e)}
      />
    </div>
  );
};

export default ShareFile;
