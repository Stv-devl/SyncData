import React from 'react';
import { ModaleFileProps } from '@/types/type';

const CopyLink: React.FC<ModaleFileProps> = () => {
  return (
    <>
      <p className="text-darkest-blue mt-4 text-center font-medium">
        Link successfully copied to clipboard!
      </p>
    </>
  );
};

export default CopyLink;
