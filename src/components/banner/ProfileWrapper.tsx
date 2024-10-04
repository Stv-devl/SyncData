import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { icones } from '../../constantes/constantes';
import { signOut } from 'next-auth/react';

const ProfileWrapper = () => {
  const isImage = false;

  return (
    <>
      <Link href="/profile">
        {!isImage ? (
          <icones.Iconprofile
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
      <div className="ml-2 cursor-pointer" onClick={() => signOut()}>
        <icones.Iconlogout fill={'#08396F'} className="size-[25px] w-[35px]" />
      </div>
    </>
  );
};

export default ProfileWrapper;
