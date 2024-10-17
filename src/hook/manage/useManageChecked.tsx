import React, { useCallback, useState } from 'react';

const useManageChecked = () => {
  const [fileName, setFileName] = useState('');
  const [checkedFile, setCheckedFile] = useState<string | null>(null);

  const handleCheck = useCallback((fileId: string, isChecked: boolean) => {
    setCheckedFile(isChecked ? fileId : null);
  }, []);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setFileName(e.target.value);
  }, []);

  return {
    fileName,
    setFileName,
    checkedFile,
    handleCheck,
    handleChange,
  };
};

export default useManageChecked;
