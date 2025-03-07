'use client';

import React from 'react';
import useAutoCloseModal from '@/hook/ui/useAutoCloseModal';
import { ModaleFileProps } from '@/types/type';

/**
 * UpdateProfile component that displays a confirmation message when a profile is updated
 * @component
 * @param {ModaleFileProps} props - The properties for the UpdateProfile component
 * @returns {JSX.Element} The rendered UpdateProfile component with auto-close functionality
 */
const UpdateProfile: React.FC<ModaleFileProps> = () => {
  useAutoCloseModal(1500);

  return (
    <div className="flex flex-col items-center justify-center">
      <p className="text-darkest-blue font-semibold">
        Your profile has been updated successfully.
      </p>
    </div>
  );
};

export default UpdateProfile;
