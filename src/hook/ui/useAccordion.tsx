import React, { useCallback, useState } from 'react';

const useAccordion = () => {
  const [fileName, setFileName] = useState<string>('');
  const [checkedFile, setCheckedFile] = useState<string | null>(null);
  const [openItems, setOpenItems] = useState<{ [key: string]: boolean }>({});

  const handleCheck = useCallback((fileId: string, isChecked: boolean) => {
    setCheckedFile(isChecked ? fileId : null);
  }, []);

  const handleChange = useCallback(
    (input: React.ChangeEvent<HTMLInputElement> | string) => {
      if (typeof input === 'string') {
        setFileName(input);
      } else {
        setFileName(input.target.value);
      }
    },
    []
  );

  const toggleOpen = useCallback((fileId: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [fileId]: !prev[fileId],
    }));
  }, []);

  const isOpen = useCallback(
    (fileId: string) => {
      return openItems[fileId] || false;
    },
    [openItems]
  );

  return {
    fileName,
    checkedFile,
    handleCheck,
    handleChange,
    toggleOpen,
    isOpen,
  };
};

export default useAccordion;
