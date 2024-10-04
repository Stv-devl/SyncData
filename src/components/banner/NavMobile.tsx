import React from 'react';
import { icones, navItems } from '../../constantes/constantes';
import NavWrapper from './NavWrapper';
import { usePathname } from 'next/navigation';
import useBurgerStore from '@/store/useBurgerMenu';
import ProfileWrapper from './ProfileWrapper';
import clsx from 'clsx';

const NavMobile = () => {
  const { isOpen, toggleBurger } = useBurgerStore();
  const pathname = usePathname();

  return (
    <>
      <nav className="flex flex-row justify-between gap-5 bg-white p-5">
        <div
          className="flex cursor-pointer items-center"
          onClick={toggleBurger}
        >
          {!isOpen ? <icones.IconVector fill={'#08396F'} /> : ''}
        </div>
        <icones.Iconlogo className="ml-2 h-[75px] w-[70px]" />
        <div className="flex flex-row items-center gap-1 lg:flex-col lg:gap-7">
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
