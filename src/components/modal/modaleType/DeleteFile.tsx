import React from 'react';
import ButtonModalWrapper from '@/components/button/ButtonModalWrapper';

const DeleteFile = () => {
  const handleDelete = (e) => {
    e.preventDefault();
    console.log('click');
  };
  return (
    <div className="h-full ">
      <h1 className="text-darkest-blue text-title pb-4">Delete a file</h1>
      <p className="pb-8">Do you really want to delete this file?</p>
      <ButtonModalWrapper
        actionLabel="Delete"
        handleAction={(e) => handleDelete(e)}
      />
    </div>
  );
};

export default DeleteFile;
