import React from 'react';
import Button from '../../button/Button';
import useModalStore from '@/store/useModale';

const DeleteFile = () => {
  const handleClick = (e) => {
    e.preventDefault();
    console.log('click');
  };
  return (
    <>
      <h1 className="text-darkest-blue text-title pb-4">Delete a file</h1>
      <p className="pb-8">Do you really want to delete this file?</p>
      <div className="flex gap-8">
        <div className="h-[35px] w-[90px]">
          <Button
            label={'Cancel'}
            onClick={() => useModalStore.getState().closeModal()}
            color={'empty'}
          />
        </div>
        <div className="h-[35px] w-[90px]">
          <Button
            label={'Delete'}
            color={'full'}
            onClick={handleClick}
            type={'submit'}
          />
        </div>
      </div>
    </>
  );
};

export default DeleteFile;
