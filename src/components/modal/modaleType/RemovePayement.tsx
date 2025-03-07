import React from 'react';
import ButtonModalWrapper from '@/components/button/ButtonModalWrapper';
import useModalStore from '@/store/ui/useModale';
import { useUserStore } from '@/store/useUserStore';
import { ModaleFileProps } from '@/types/type';

/**
 * DeleteFile component that displays a confirmation dialog for deleting a file
 * @component
 * @param {ModaleFileProps} props - The properties for the DeleteFile component
 * @param {string} props.fileId - The ID of the file to delete
 * @param {string|string[]} props.fileName - The name(s) of the file(s) to delete
 * @returns {JSX.Element|null} The rendered DeleteFile component or null if no fileId provided
 */
const RemovePayement: React.FC<ModaleFileProps> = () => {
  const { cancelSubscription } = useUserStore();

  const handleRemovePayement = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    cancelSubscription();
    useModalStore.getState().closeModal();
  };
  return (
    <div className="size-full">
      <h1 className="text-darkest-blue text-title pb-4 ">Remove Payement</h1>
      <p>Do you really want to remove your payement method?</p>
      <ButtonModalWrapper
        actionLabel="Remove"
        handleAction={(e) =>
          handleRemovePayement(e as React.FormEvent<HTMLFormElement>)
        }
      />
    </div>
  );
};

export default RemovePayement;
