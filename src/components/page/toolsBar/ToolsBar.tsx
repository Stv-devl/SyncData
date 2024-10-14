import { selectedToolsBtn, toolsBtn } from '@/constantes/constantes';
import React, { useCallback } from 'react';
import ToolsBarWrapper from './ToolsBarWrapper';
import useModalStore from '@/store/useModale';

const ToolsBar = () => {
  const isSelected = true;

  const handleButtonClick = useCallback((label: string) => {
    if (label === 'Download') {
      console.log('download');
    } else {
      const modalName = label.split(' ')[0] + 'File';
      useModalStore.getState().openModal(modalName);
    }
  }, []);

  const combinedButtons = isSelected
    ? [...toolsBtn, ...selectedToolsBtn]
    : toolsBtn;

  return (
    <section className="mx-auto flex h-[90px] w-full items-center justify-center rounded-lg bg-white px-2 sm:justify-start sm:px-4 md:px-10">
      <div className="flex items-center gap-11 sm:gap-4 md:gap-8">
        {combinedButtons.map((item) => (
          <ToolsBarWrapper
            key={item.label}
            {...item}
            onClick={() => handleButtonClick(item.label)}
            color={item.color as 'empty' | 'full'}
          />
        ))}
      </div>
    </section>
  );
};

export default ToolsBar;
