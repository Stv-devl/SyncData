'use client';

import React from 'react';
import Link from 'next/link';

const Banner = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/home">Home</Link>
        </li>
        <li>
          <Link href="/profile">Profile</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Banner;
