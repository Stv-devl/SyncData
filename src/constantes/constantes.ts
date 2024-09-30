'use client';

import Iconemail from '../assets/icon-email.svg';
import Iconpassword from '../assets/icon-password.svg';
import Icongoogle from '../assets/icon-google.svg';
import Iconprofile from '../assets/icon-profile.svg';
import Iconlogout from '../assets/incon-logout.svg';

type IconComponents = {
  [key: string]: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
};

export const icones: IconComponents = {
  Iconemail,
  Iconpassword,
  Icongoogle,
  Iconprofile,
  Iconlogout,
};

export const navItems = [
  { path: '/home', type: 'Home' },
  { path: '/favorite', type: 'Favorite' },
  { path: '/pricing', type: 'Pricing' },
  { path: '/bin', type: 'Recycle bin' },
];
