'use client';

import React, { useState } from 'react';
import { icones } from '../../../constantes/constantes';
import Header from './Header';
import ListContent from './content/ListContent';
import FileContent from './content/FileContent';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';

const Array = () => {
  //mettre isList dans store + persistant
  const [isList, setIsList] = useState(true);

  const toggleIcon = () => setIsList((prev) => !prev);

  const testFile = [
    {
      checked: false,
      filename: '01 Drawing ',
      type: 'file',
      modified: '10/10/2022',
      acces: 'only you',
    },
    {
      checked: false,
      filename: '02 Surveying',
      type: 'file',
      modified: '10/10/2022',
      acces: 'only you',
    },
    {
      checked: false,
      filename: '03 Price',
      type: 'file',
      modified: '10/10/2022',
      acces: 'only you',
    },
    {
      checked: false,
      filename: 'Dupon-DCE.pdf',
      type: 'pdf',
      modified: '10/10/2022',
      acces: 'only you',
    },
    {
      checked: false,
      filename: 'Dupon-house.png',
      type: 'image',
      modified: '10/10/2022',
      acces: 'only you',
    },

    {
      checked: false,
      filename: 'Dupont-house.xbg',
      type: 'unknown',
      modified: '10/10/2022',
      acces: 'only you',
    },

    {
      checked: false,
      filename: 'Dupont-house.dwg',
      type: 'dwg',
      modified: '10/10/2022',
      acces: 'only you',
    },

    /* {
      checked: false,
      filename: '03 Price',
      modified: '10/10/2022',
      acces: 'only you',
    },
    {
      checked: false,
      filename: '03 Price',
      modified: '10/10/2022',
      acces: 'only you',
    },
    {
      checked: false,
      filename: '03 Price',
      modified: '10/10/2022',
      acces: 'only you',
    },
    {
      checked: false,
      filename: '03 Price',
      modified: '10/10/2022',
      acces: 'only you',
    },
    {
      checked: false,
      filename: '03 Price',
      modified: '10/10/2022',
      acces: 'only you',
    },
    {
      checked: false,
      filename: '03 Price',
      modified: '10/10/2022',
      acces: 'only you',
    },
    {
      checked: false,
      filename: '03 Price',
      modified: '10/10/2022',
      acces: 'only you',
    },
    {
      checked: false,
      filename: '03 Price',
      modified: '10/10/2022',
      acces: 'only you',
    },
    {
      checked: false,
      filename: '03 Price',
      modified: '10/10/2022',
      acces: 'only you',
    },
    {
      checked: false,
      filename: '03 Price',
      modified: '10/10/2022',
      acces: 'only you',
    },
    {
      checked: false,
      filename: '03 Price',
      modified: '10/10/2022',
      acces: 'only you',
    },
    {
      checked: false,
      filename: '03 Price',
      modified: '10/10/2022',
      acces: 'only you',
    },
    {
      checked: false,
      filename: '03 Price',
      modified: '10/10/2022',
      acces: 'only you',
    },
    {
      checked: false,
      filename: '03 Price',
      modified: '10/10/2022',
      acces: 'only you',
    },
    {
      checked: false,
      filename: '03 Price',
      modified: '10/10/2022',
      acces: 'only you',
    },*/
  ];

  return (
    <section className="relative mx-auto size-full rounded-lg bg-white p-4 lg:p-8">
      <Header isList={isList} />
      <div className="bg-lightest-gray h-[97%] w-full rounded-lg ">
        {isList ? (
          <ListContent testFile={testFile} />
        ) : (
          <FileContent testFile={testFile} />
        )}
      </div>

      <div
        onClick={() => {
          toggleIcon();
        }}
        className={twMerge(
          clsx(
            isList ? 'right-3 top-2' : 'right-2 top-1',
            'absolute hidden cursor-pointer  sm:block'
          )
        )}
      >
        {isList ? <icones.IconSortFiles /> : <icones.IconSortList />}
      </div>
    </section>
  );
};
export default Array;
