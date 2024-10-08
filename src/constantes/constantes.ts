'use client';

import Iconemail from '../icones/IconEmail';
import Iconpassword from '../icones/IconPassword';
import Icongoogle from '../icones/IconGoogle';
import Iconprofile from '../icones/iconProfile';
import Iconlogout from '../icones/IconLogout';
import Iconlogo from '../icones/IconLogo';
import IconSearch from '../icones/IconSearch';
import IconBin from '../icones/IconBin';
import IconLinks from '../icones/IconLinks';
import IconAddFile from '../icones/IconAddFile';
import IconDownload from '../icones/IconDownload';
import IconUpload from '../icones/IconUpload';
import IconVector from '../icones/IconVector';
import IconAddTeam from '../icones/IconAddTeam';
import IconDelete from '../icones/IconeDelete';
import IconShare from '../icones/IconShare';

export const icones = {
  Iconemail,
  Iconpassword,
  Icongoogle,
  Iconprofile,
  Iconlogout,
  Iconlogo,
  IconSearch,
  IconBin,
  IconLinks,
  IconAddFile,
  IconDownload,
  IconUpload,
  IconVector,
  IconAddTeam,
  IconDelete,
  IconShare,
};

export const navItems = [
  { path: '/home', type: 'Home' },
  { path: '/favorite', type: 'Favorite' },
  { path: '/pricing', type: 'Pricing' },
  { path: '/bin', type: 'Bin' },
];

export const toolsBtn = [
  {
    label: 'Upload',
    icon: icones.IconUpload,
    color: 'full',
    iconColor: '#FFFFFF',
  },
  {
    label: 'Create a file',
    icon: icones.IconAddFile,
    color: 'empty',
    iconColor: '#08396F',
  },
];

export const selectedToolsBtn = [
  {
    label: 'Download',
    icon: icones.IconDownload,
    color: 'full',
    iconColor: '#FFFFFF',
  },
  {
    label: 'Share',
    icon: icones.IconShare,
    color: 'empty',
    iconColor: '#08396F',
  },
  {
    label: 'Delete',
    icon: icones.IconDelete,
    color: 'full',
    iconColor: '#FFFFFF',
  },
];
