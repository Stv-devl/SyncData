import { selectedToolsBtn, toolsBtn } from '@/constantes/constantes';
import React, { useCallback } from 'react';
import ToolsBarWrapper from './ToolsBarWrapper';

const ToolsBar = () => {
  const isSelected = true;

  const handleUpload = useCallback(() => {
    console.log('upload');
  }, []);

  const handleAddFile = useCallback(() => {
    console.log('add file');
  }, []);

  const handleDownload = useCallback(() => {
    console.log('download');
  }, []);

  const handleShare = useCallback(() => {
    console.log('share');
  }, []);

  const handleDelete = useCallback(() => {
    console.log('delete');
  }, []);

  const getActionByType = useCallback(
    (label: string) => {
      switch (label) {
        case 'Upload':
          return handleUpload;
        case 'Download':
          return handleDownload;
        case 'Share':
          return handleShare;
        case 'Delete':
          return handleDelete;
        case 'Create a file':
          return handleAddFile;
        default:
          return () => {};
      }
    },
    [handleUpload, handleAddFile, handleDownload, handleShare, handleDelete]
  );

  return (
    <section className="mx-auto flex h-[90px] w-full items-center justify-center rounded-lg bg-white px-2 sm:justify-start sm:px-4 md:px-10 ">
      <div className="flex items-center gap-11 sm:gap-4 md:gap-8">
        {toolsBtn.map((item) => (
          <ToolsBarWrapper
            key={item.label}
            {...item}
            onClick={getActionByType(item.label)}
            color={item.color as 'empty' | 'full'}
          />
        ))}
        {isSelected &&
          selectedToolsBtn.map((item) => (
            <ToolsBarWrapper
              key={item.label}
              {...item}
              onClick={getActionByType(item.label)}
              color={item.color as 'empty' | 'full'}
            />
          ))}
      </div>
    </section>
  );
};

export default ToolsBar;
