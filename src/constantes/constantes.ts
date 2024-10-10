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
import IconSort from '../icones/iconSort';
import IconSortFiles from '../icones/IconSortFiles';
import IconFiles from '../icones/iconeFiles/IconFiles';
import IconFriends from '../icones/IconFriends';
import IconSortList from '@/icones/IconSortList';
import IconFavorite from '@/icones/IconFavorite';
import IconInfo from '../icones/IconeInfo';
import IconFilesTeam from '../icones/iconeFiles/IconFilesTeam';
import IconDwg from '../icones/iconeFiles/IconDwg';
import IconPdf from '../icones/iconeFiles/IconPdf';
import IconImage from '../icones/iconeFiles/IconImage';
import IconUnknown from '@/icones/iconeFiles/IconUnknown';

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
  IconSort,
  IconSortFiles,
  IconSortList,
  IconFiles,
  IconFriends,
  IconFavorite,
  IconInfo,
  IconFilesTeam,
  IconDwg,
  IconPdf,
  IconImage,
  IconUnknown,
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

export const arrayHeader = [
  { name: 'checked' },
  { name: 'filename' },
  { name: 'modified' },
  { name: 'acces' },
];

export const arrayIcone = [
  { icon: icones.IconFavorite, label: 'Add to favorite' },
  { icon: icones.IconShare, label: 'Share acces link' },
  { icon: icones.IconDownload, label: 'Download' },
  { icon: icones.IconDelete, label: 'Delete' },
];
