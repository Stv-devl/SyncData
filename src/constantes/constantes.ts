import { iconsMap } from './iconsMap';

export const navItems = [
  { path: '/home', type: 'Home' },
  { path: '/favorite', type: 'Favorite' },
  { path: '/pricing', type: 'Pricing' },
  { path: '/bin', type: 'Bin' },
];

export const toolsBtn = [
  {
    label: 'Upload',
    icon: iconsMap.IconUpload,
    color: 'full',
    iconColor: '#FFFFFF',
    type: 'UploadFile',
  },
  {
    label: 'Create a file',
    icon: iconsMap.IconAddFile,
    color: 'empty',
    iconColor: '#08396F',
    type: 'CreateFolder',
  },
];

export const selectedToolsBtn = [
  {
    label: 'Download',
    icon: iconsMap.IconDownload,
    color: 'full',
    iconColor: '#FFFFFF',
    type: 'DownloadFile',
  },
  {
    label: 'Share',
    icon: iconsMap.IconShare,
    color: 'empty',
    iconColor: '#08396F',
    type: 'ShareFile',
  },
  {
    label: 'Delete',
    icon: iconsMap.IconDelete,
    color: 'full',
    iconColor: '#FFFFFF',
    type: 'DeleteFile',
  },
];

export const arrayHeader = [
  { name: 'checked' },
  { name: 'filename' },
  { name: 'modified' },
  { name: 'acces' },
];

export const arrayIcone = [
  { icon: iconsMap.IconFavorite, type: 'favorite', label: 'Add to favorite' },
  { icon: iconsMap.IconShare, type: 'share', label: 'Copie acces link' },
  { icon: iconsMap.IconDownload, type: 'download', label: 'Download' },
  { icon: iconsMap.IconDelete, type: 'delete', label: 'Delete' },
];

export const arrayPopup = [
  { icon: iconsMap.IconInfo, type: 'information', label: 'Information' },
  { icon: iconsMap.IconFavorite, type: 'favorite', label: 'Favorite' },
  { icon: iconsMap.IconShare, type: 'share', label: 'Share link' },
  { icon: iconsMap.IconDownload, type: 'download', label: 'Download' },
  { icon: iconsMap.IconMoveFile, type: 'move', label: 'Move file' },
  { icon: iconsMap.IconChangeName, type: 'change', label: 'Change name' },
  { icon: iconsMap.IconDelete, type: 'delete', label: 'Delete' },
];
