import { selectedToolsBtn, toolsBtn } from '@/constantes/constantes';
import React, { useCallback, useMemo } from 'react';
import ToolsBarWrapper from './ToolsBarWrapper';
import { useUserStore } from '@/store/useUserStore';
import useManageCheckedItems from '@/hook/manage/useManageCheckedItems';
import useManageFonctions from '@/hook/manage/useManageFonctions';

const ToolsBar = () => {
  const { files } = useUserStore();

  const { fileId, fileName, checkedItems } = useManageCheckedItems(files);

  const { getActionByType } = useManageFonctions();

  const handleButtonClick = useCallback(
    (type: string) => {
      if (type === 'download') {
        console.log('download');
      } else {
        getActionByType(type, fileId, fileName);
      }
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
    <section className="mx-auto flex h-[90px] w-full items-center justify-center rounded-lg bg-white px-2 sm:justify-start sm:px-4 md:px-10">
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
