import Image from 'next/image';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import usePopupStore from '@/store/ui/usePopup';
import { useUserStore } from '@/store/useUserStore';
import { iconsMap } from '../../constantes/iconsMap';

/**
 * ProfileWrapper component that displays the profile information
 * @returns The ProfileWrapper component
 */

const ProfileWrapper = () => {
  const { profile } = useUserStore();
  const { handleMouseEnter, handleMouseLeave } = usePopupStore();

  const isTablet = useMediaQuery({ minWidth: 641, maxWidth: 1024 });

  const transformLogout = isTablet
    ? 'translate(-30%, 100%)'
    : 'translate(70%, -20%)';
  const transformProfile = isTablet
    ? 'translate(-20%, 120%)'
    : 'translate(70%, 0%)';

  const [imageError, setImageError] = useState(false);
  const profileImage = typeof profile?.image === 'string' ? profile.image : '';

  return (
    <>
      <Link
        href="/profile"
        onMouseEnter={(e) => handleMouseEnter(e, 'Profile', transformProfile)}
        onMouseLeave={handleMouseLeave}
        className="min-w-[48px]"
      >
        {!imageError && profileImage ? (
          <Image
            src={profileImage}
            width={48}
            height={48}
            className="size-[40px] rounded-full border-2 object-cover text-darkest-blue"
            alt="Profile"
            priority
            onError={() => setImageError(true)}
          />
        ) : (
          <iconsMap.Iconprofile
            width={50}
            height={50}
            className="size-[40px] rounded-full border-2 border-blue-600"
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
