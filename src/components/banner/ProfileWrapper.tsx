import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { iconsMap } from '../../constantes/iconsMap';
import { signOut } from 'next-auth/react';
import usePopupStore from '@/store/ui/usePopup';
import { useMediaQuery } from 'react-responsive';

const ProfileWrapper = () => {
  const { handleMouseEnter, handleMouseLeave } = usePopupStore();
  const isImage = false;

  const isTablet = useMediaQuery({ minWidth: 641, maxWidth: 1024 });

  const transformLogout = isTablet
    ? 'translate(-30%, 100%)'
    : 'translate(70%, -20%)';
  const transformProfile = isTablet
    ? 'translate(-20%, 120%)'
    : 'translate(70%, 0%)';

  return (
    <>
      <Link
        href="/profile"
        onMouseEnter={(e) => handleMouseEnter(e, 'Profile', transformProfile)}
        onMouseLeave={handleMouseLeave}
      >
        {!isImage ? (
          <iconsMap.Iconprofile
            width={50}
            height={50}
            className=" size-[40px] rounded-full border-2 border-blue-600"
          />
        ) : (
          <Image
            src=""
            width={48}
            height={48}
            className="text-darkest-blue size-[40px] rounded-full border-2"
            alt="Profile"
            priority
          />
        )}
      </Link>
      <div
        className="items-centerml-2 flex cursor-pointer"
        onClick={() => signOut()}
      >
        <iconsMap.Iconlogout
          fill={'#08396F'}
          className="size-[25px] w-[35px]"
          onMouseEnter={(e) => handleMouseEnter(e, 'Logout', transformLogout)}
          onMouseLeave={handleMouseLeave}
        />
      </div>
    </>
  );
};

export default ProfileWrapper;
