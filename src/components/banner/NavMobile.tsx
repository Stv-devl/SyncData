import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import React from 'react';
import { navItems } from '../../constantes/constantes';
import NavWrapper from './NavWrapper';
import ProfileWrapper from './ProfileWrapper';
import { iconsMap } from '@/constantes/iconsMap';
import useBurgerStore from '@/store/ui/useBurgerMenu';

/**
 * NavMobile component that displays the mobile navigation bar
 * @returns The NavMobile component
 */

const NavMobile = () => {
  const { isOpen, toggleBurger } = useBurgerStore();
  const pathname = usePathname();

  return (
    <>
      <nav className="mb-5 flex flex-row justify-between gap-5 bg-white p-2">
        <div
          className="flex cursor-pointer items-center"
          onClick={toggleBurger}
        >
          {!isOpen ? <iconsMap.IconVector fill={'#08396F'} /> : ''}
        </div>
        <iconsMap.Iconlogo className="ml-2 h-[75px] w-[70px]" />
        <div className="flex flex-row items-center gap-2 lg:flex-col ">
          <ProfileWrapper />
        </div>
      </nav>

      <div
        className={clsx(
          'text-darkest-blue fixed left-0 top-0 z-[100] flex w-[150px] flex-col gap-7 rounded-r-lg bg-white py-10 font-semibold transition-transform ease-in-out',
          isOpen ? 'translate-x-0' : '-translate-x-full',
          'duration-400'
        )}
      >
        {navItems.map((item) => (
          <NavWrapper
            key={item.path}
            type={item.type}
            isSelected={pathname === item.path}
            link={item.path}
          />
        ))}
      </div>

      {isOpen && (
        <div
          className="bg-darkest-gray fixed left-0 top-0 z-[99] h-screen w-screen opacity-60"
          onClick={toggleBurger}
        ></div>
      )}
    </>
  );
};

export default NavMobile;
