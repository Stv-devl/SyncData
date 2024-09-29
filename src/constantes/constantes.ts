'use client';

import Iconemail from '../assets/icon-email.svg';
import Iconpassword from '../assets/icon-password.svg';
import Icongoogle from '../assets/icon-google.svg';

type IconComponents = {
  [key: string]: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
};

export const icones: IconComponents = {
  Iconemail,
  Iconpassword,
  Icongoogle,
};
