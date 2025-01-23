'use client';

import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';
import { twMerge } from 'tailwind-merge';
import { NavWrapperProps } from '@/types/type';

const NavWrapper: React.FC<NavWrapperProps> = ({
  type,
  isSelected,
  link,
}: NavWrapperProps): JSX.Element => {
  return (
    <Link
      className={twMerge(
        'flex items-center justify-start lg:w-full sm:h-[40px] lg:h-[60px] p-4 hover:bg-light-blue transition ease-in-out duration-700 rounded-lg',
        clsx({ 'bg-light-blue': isSelected })
      )}
      href={link}
    >
      {type}
    </Link>
  );
};

export default NavWrapper;
