'use client';

import React from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import { NavWrapperProps } from '@/types/type';

/**
 * NavWrapper renders a navigation link with an icon and label.
 * It adjusts styling based on the link type and selection state.
 * @param {IconWrapperType} props - Component properties.
 * @param {'link' | 'profile'} props.type - The type of navigation link.
 * @param {boolean} props.isSelected - Indicates if the link is currently selected.
 * @param {string} props.link - The URL to navigate to.
 * @returns {JSX.Element} The NavWrapper component.
 */

const NavWrapper: React.FC<NavWrapperProps> = ({
  type,
  isSelected,
  link,
}: NavWrapperProps): JSX.Element => {
  return (
    <li
      className={twMerge(
        'flex items-center justify-start w-full h-[60px] p-4 hover:bg-light-blue transition ease-in-out duration-700',
        clsx({ 'bg-light-blue': isSelected })
      )}
    >
      <Link href={link}>{type}</Link>
    </li>
  );
};

export default NavWrapper;
