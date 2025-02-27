import { iconsMap } from './iconsMap';

/**
 * NavItems constant that defines the navigation items for the application
 * @constant
 * @type {Array}
 */
export const navItems = [
  { path: '/home', type: 'Home' },
  { path: '/favorite', type: 'Favorite' },
  { path: '/pricing', type: 'Pricing' },
];

/**
 * ToolsBtn constant that defines the tools buttons for the application
 * @constant
 * @type {Array}
 */
export const toolsBtn = [
  {
    label: 'Upload',
    icon: iconsMap.IconUpload,
    color: 'full',
    iconColor: '#FFFFFF',
    type: 'upload',
  },
  {
    label: 'Create a folder',
    icon: iconsMap.IconAddFile,
    color: 'empty',
    iconColor: '#08396F',
    type: 'create',
  },
];

/**
 * SelectedToolsBtn constant that defines the selected tools buttons for the application
 * @constant
 * @type {Array}
 */
export const selectedToolsBtn = [
  {
    label: 'Download',
    icon: iconsMap.IconDownload,
    color: 'full',
    iconColor: '#FFFFFF',
    type: 'download',
  },

  {
    label: 'Delete',
    icon: iconsMap.IconDelete,
    color: 'full',
    iconColor: '#FFFFFF',
    type: 'delete',
  },
];

/**
 * ArrayHeader constant that defines the array header for the application
 * @constant
 * @type {Array}
 */
export const arrayHeader = [
  { name: 'filename' },
  { name: 'modified' },
  { name: 'acces' },
];

/**
 * ArrayIcone constant that defines the array icon for the application
 * @constant
 * @type {Array}
 */
export const arrayIcone = [
  { icon: iconsMap.IconFavorite, type: 'favorite' },
  { icon: iconsMap.IconShare, type: 'share' },
  { icon: iconsMap.IconDownload, type: 'download' },
  { icon: iconsMap.IconDelete, type: 'delete' },
];

/**
 * ArrayPopup constant that defines the array popup for the application
 * @constant
 * @type {Array}
 */
export const arrayPopup = [
  { icon: iconsMap.IconInfo, type: 'information', label: 'Information' },
  { icon: iconsMap.IconFavorite, type: 'favorite', label: 'Favorite' },
  { icon: iconsMap.IconShare, type: 'share', label: 'Share link' },
  { icon: iconsMap.IconDownload, type: 'download', label: 'Download' },
  { icon: iconsMap.IconChangeName, type: 'change', label: 'Change name' },
  { icon: iconsMap.IconDelete, type: 'delete', label: 'Delete' },
];
