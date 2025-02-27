'use client';

import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';
import { twMerge } from 'tailwind-merge';
import { NavWrapperProps } from '@/types/type';

/**
 * NavWrapper component that displays a navigation link
 * @param {Object} props - Component props
 * @param {string} props.type - The type of the link
 * @param {boolean} props.isSelected - Whether the link is selected
 * @param {string} props.link - The link to navigate to
 */
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
