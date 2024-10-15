import AccordionMenu from '@/components/accordeon/AccordionMenu';
import { files } from '@/constantes/files';
import { filteredFiles } from '@/utils/filteredFiles';
import React, { useState } from 'react';

const UploadFile = () => {
  const [fileContent, setFileContent] = useState('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result;
        if (typeof result === 'string') {
          setFileContent(result);
        }
      };
      reader.readAsText(file);
    } else {
      setFileContent('No file chosen.');
    }
  };

  return (
    <>
      <h1 className="text-darkest-blue text-title pb-4">Upload a document</h1>
      <form action="">
        <div>
          <p>Browse your file</p>
          <input type="file" onChange={handleFileChange} />
        </div>
        <AccordionMenu files={filteredFiles(files)} />
      </form>
    </>
  );
};

export default UploadFile;
