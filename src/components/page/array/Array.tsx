'use client';

import React, { useState } from 'react';
import { icones } from '../../../constantes/constantes';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import usePopupStore from '@/store/usePopup';
import Header from './Header';
import ListContent from './content/ListContent';
import FileContent from './content/FileContent';
import EmptyContent from './content/EmptyContent';
import { useUserStore } from '@/store/useUserStore';

const Array = () => {
  //mettre isList dans store + persistant, pareil pour FileContent
  const [isList, setIsList] = useState(true);

  const { user } = useUserStore();

  const toggleIcon = () => setIsList((prev) => !prev);

  const { handleMouseEnter, handleMouseLeave } = usePopupStore();

  const mouseLabel = isList ? 'Folder' : 'List';
  const mouseTransform = isList
    ? 'translate(-20%, -110%)'
    : 'translate(0%, -100%)';

  return (
    <section className="relative mx-auto size-full rounded-lg bg-white p-4 lg:p-8">
      <Header isList={isList} />
      <div className="bg-lightest-gray h-[97%] w-full rounded-lg ">
        {user && user.files.length > 1 ? (
          <>
            {isList ? (
              <ListContent files={user.files} />
            ) : (
              <FileContent files={user.files} />
            )}
          </>
        ) : (
          <EmptyContent />
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
        onMouseEnter={(e) => handleMouseEnter(e, mouseLabel, mouseTransform)}
        onMouseLeave={handleMouseLeave}
      >
        {isList ? <icones.IconSortFiles /> : <icones.IconSortList />}
      </div>
    </section>
  );
};
export default Array;
