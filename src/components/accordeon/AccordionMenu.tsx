import React from 'react';
import AccordionItem from './AccordionItem';
import { ArrayContentProps } from '@/types/type';

const AccordionMenu: React.FC<ArrayContentProps> = ({ files }) => {
  return (
    <div className="border-regular-gray h-[222px] w-[344px] overflow-y-auto rounded-lg border p-3">
      {files.map((file, index) => (
        <AccordionItem key={index} file={file} />
      ))}
    </div>
  );
};

export default AccordionMenu;
