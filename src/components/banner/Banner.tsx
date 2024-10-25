import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { navItems } from '../../constantes/constantes';
import { iconsMap } from '../../constantes/iconsMap';
import NavMobile from './NavMobile';
import NavWrapper from './NavWrapper';
import ProfileWrapper from './ProfileWrapper';

const Banner = () => {
  const [isMounted, setIsMounted] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const isMobile = useMediaQuery({ maxWidth: 640 });

  if (!isMounted) return null;

  return (
    <>
      {isMobile ? (
        <NavMobile />
      ) : (
        <nav className="mb-5 h-[100px] w-full rounded-lg bg-white py-0 pl-1 pr-5 lg:sticky lg:h-full lg:w-[118px] lg:px-0 lg:py-5">
          <div className="flex size-full flex-row items-center justify-between lg:flex-col">
            <div className="flex size-full flex-row lg:block">
              <div className="flex items-center justify-center lg:mb-11">
                <iconsMap.Iconlogo className="size-[80px] lg:h-[110px] lg:w-[105px]" />
              </div>
              <div className="text-darkest-blue boxShadow-custom-gray ml-7 flex w-full flex-row items-center gap-3 font-semibold lg:ml-0 lg:flex-col lg:gap-5">
                {navItems.map((item) => (
                  <NavWrapper
                    key={item.path}
                    type={item.type}
                    isSelected={pathname === item.path}
                    link={item.path}
                  />
                ))}
              </div>
            </div>
            <div className="flex flex-row items-center gap-3 lg:flex-col lg:gap-7">
              <ProfileWrapper />
            </div>
          </div>
        </nav>
      )}
    </>
  );
};

export default Banner;
