'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { icones, navItems } from '../../constantes/constantes';
import { signOut } from 'next-auth/react';
import NavWrapper from './NavWrapper';

const Banner = () => {
  const isImage = false;

  const pathname = usePathname();

  console.log(pathname);

  return (
    <nav className=" fixed z-3 bg-white w-[118px] h-[97%] rounded-lg py-8">
      <div className="mb-11 text-center">SyncData</div>
      <div className="flex flex-col justify-between items-center h-[97%] py-8 ">
        <ul className="flex flex-col gap-5 w-full text-darkest-blue font-semibold ">
          {navItems.map((item) => (
            <NavWrapper
              key={item.path}
              type={item.type}
              isSelected={pathname === item.path}
              link={item.path}
            />
          ))}
        </ul>
        <div className="flex flex-col gap-7 items-center">
          <Link href="/profile">
            {!isImage ? (
              <icones.Iconprofile className="w-12 h-12 rounded-full border-2 border-blue-600 " />
            ) : (
              <Image
                src=""
                width={48}
                height={48}
                className="rounded-full border-2 text-darkest-blue"
                alt="Profile"
                priority
              />
            )}
          </Link>
          <div className="cursor-pointer ml-2" onClick={() => signOut()}>
            <icones.Iconlogout className="text-darkest-blue" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Banner;
