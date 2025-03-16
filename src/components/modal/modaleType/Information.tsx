import { findFileRecursive } from 'lib/utils/fileOperations/findFileRecursive';
import React, { useMemo } from 'react';
import { useFileStore } from '@/store/useFileStore';
import { ModaleFileProps } from '@/types/type';

/**
 * Information modal component that displays file details
 * @component
 * @returns {JSX.Element | null} The information modal component or null if no file is found
 */
const Information = ({ fileName, fileId }: ModaleFileProps) => {
  const { files } = useFileStore();

  const foundFile = useMemo(() => {
    if (!files || !fileId) return null;
    const result = findFileRecursive(files, fileId);
    return !result || Array.isArray(result) ? null : result;
  }, [files, fileId]);

  if (!foundFile) return null;

  const infoItems = [
    { label: 'Name:', value: fileName },
    { label: 'Type:', value: foundFile.type },
    { label: 'Modified:', value: foundFile.modified },
    { label: 'Favorite:', value: foundFile.isFavorite ? 'Yes' : 'No' },
  ];

  return (
    <>
      <h1 className="text-darkest-blue text-titleSmall sm:text-title pb-4 text-center sm:pb-7">
        Informations
      </h1>

      <div className="flex size-full flex-col gap-2">
        {infoItems.map((item, index) => (
          <div key={index} className="flex gap-2">
            <div className="w-20 font-medium">{item.label}</div>
            <div className="capitalize">{item.value}</div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Information;
