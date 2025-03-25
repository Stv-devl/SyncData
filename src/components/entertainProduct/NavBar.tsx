import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { twMerge } from 'tailwind-merge';
import { iconsMap } from '../../constantes/iconsMap';

/**
 * Banner component that displays the navigation bar with login and register links
 * @returns The banner component
 */
const NavBar = () => {
  const pathname = usePathname();

  return (
    <>
      <nav className="mb-5 h-[90px] w-full rounded-lg bg-white py-0 pl-1 pr-5 shadow-sm">
        <div className="flex size-full items-center justify-between ">
          <iconsMap.Iconlogo className="size-[80px] lg:size-[90px]" />

          <div className="flex gap-2 font-semibold text-darkest-blue ">
            <Link
              href="/login"
              className={twMerge(
                'flex items-center p-4 hover:bg-light-blue transition ease-in-out duration-700 rounded-lg',
                clsx({ 'bg-light-blue': pathname === '/login' })
              )}
            >
              Login
            </Link>
            <Link
              href="/signup"
              className={twMerge(
                'flex items-center p-4 hover:bg-light-blue transition ease-in-out duration-700 rounded-lg',
                clsx({ 'bg-light-blue': pathname === '/signup' })
              )}
            >
              Register
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
