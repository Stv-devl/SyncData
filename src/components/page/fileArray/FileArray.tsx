'use client';

import React from 'react';
import ArrayHeader from './ArrayHeader';
import ArrayContent from './ArrayContent';

const FileArray = () => {
  const testFile = [
    {
      checked: false,
      filename: '01 Drawing ',
      modified: '10/10/2022',
      acces: 'only you',
    },
    {
      checked: false,
      filename: '02 Surveying',
      modified: '10/10/2022',
      acces: 'only you',
    },
    {
      checked: false,
      filename: '03 Price',
      modified: '10/10/2022',
      acces: 'only you',
    },
  ];

  return (
    <section className="relative mx-auto size-full rounded-lg bg-white p-4 lg:p-8 ">
      <ArrayHeader />
      {testFile &&
        testFile.map((file) => (
          <ArrayContent file={file} key={file.filename} />
        ))}
    </section>
  );
};

export default FileArray;
