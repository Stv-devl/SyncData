import React, { useCallback, useMemo } from 'react';
import ToolsBarWrapper from './ToolsBarWrapper';
import { selectedToolsBtn, toolsBtn } from '@/constantes/constantes';
import useManageFonctions from '@/hook/manage/useManageFonctions';
import useCheckedItems from '@/hook/ui/useCheckedItems';
import { useFileStore } from '@/store/useFileStore';

const ToolsBar = () => {
  const { displayFiles } = useFileStore();

  const { fileId, fileName, checkedItems } = useCheckedItems(displayFiles);

  const { getActionByType } = useManageFonctions();

  const handleButtonClick = useCallback(
    (type: string) => {
      getActionByType(type, fileId, fileName);
    },
    [fileId, fileName, getActionByType]
  );

  const combinedButtons = useMemo(
    () =>
      checkedItems && checkedItems.length > 0
        ? [...toolsBtn, ...selectedToolsBtn]
        : toolsBtn,
    [checkedItems]
  );

  return (
    <section className="mx-auto flex h-[65px] w-full items-center justify-center rounded-lg bg-white px-2 sm:min-h-[80px] sm:justify-start sm:px-4 md:px-10">
      <div className="flex items-center gap-11 sm:gap-4 md:gap-8">
        {combinedButtons.map((item) => (
          <ToolsBarWrapper
            key={item.label}
            {...item}
            onClick={() => handleButtonClick(item.type)}
            color={item.color as 'empty' | 'full'}
          />
        ))}
      </div>
    </section>
  );
};

export default ToolsBar;
