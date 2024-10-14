import React from 'react';
import { icones } from '../../../../constantes/constantes';

const EmptyContent = () => {
  return (
    <div className="flex size-full items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <icones.IconEmpty />
        <p className="text-title text-regular-gray">Drag your file</p>
      </div>
    </div>
  );
};

export default EmptyContent;
