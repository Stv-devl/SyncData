import React from 'react';
import useAutoCloseModal from '@/hook/ui/useAutoCloseModal';

/**
 * CopyLink component that displays a success message when a link is copied
 * @returns {JSX.Element} The rendered CopyLink component with a centered success message
 */

const CopyLink = () => {
  useAutoCloseModal(1500);

  return (
    <>
      <p className="text-darkest-blue mt-4 text-center font-medium">
        Link successfully copied to clipboard!
      </p>
    </>
  );
};

export default CopyLink;
