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

/**
 * Plans constant that defines the plans for the application
 * @constant
 * @type {Array}
 */
export interface Plan {
  key: string;
  name: string;
  price: string;
  storage: string;
  features: string[];
  buttonLabel: string;
}

export const plans: Plan[] = [
  {
    key: 'basic',
    name: 'Basic',
    price: 'Free',
    storage: '5 GB storage',
    features: ['1 user', 'Multi-device sync', 'File sharing'],
    buttonLabel: 'Register',
  },
  {
    key: 'professional',
    name: 'Professional',
    price: '$19.99/month',
    storage: '3 TB storage',
    features: ['1 user', 'Transfer files up to 50 GB', 'Advanced tools'],
    buttonLabel: 'Register',
  },
  {
    key: 'business',
    name: 'Business',
    price: '$29.99/month',
    storage: 'Unlimited storage',
    features: [
      '5+ users',
      'Transfer files up to 100 GB',
      'Dedicated 24/7 support',
    ],
    buttonLabel: 'Register',
  },
] as const;

/**
 * Features data for the product showcase
 */
export const landingPageFeatures = [
  {
    title: 'Real-time Synchronization',
    description: 'Instantly sync your files across all your devices',
    icon: 'IconSync',
  },
  {
    title: 'Enhanced Security',
    description: 'Protect your files with enhanced security',
    icon: 'IconSecurity',
  },
  {
    title: 'Simplified Collaboration',
    description: 'Share and collaborate on your projects with ease',
    icon: 'IconCollaboration',
  },
  {
    title: 'Flexible Storage',
    description: 'Different storage plans to meet your needs',
    icon: 'IconStorage',
  },
];

/**
 * Testimonials data for the product showcase
 */
export const testimonials = [
  {
    name: 'Marie Djon',
    company: 'Tech Solutions',
    comment:
      'SyncData has transformed how we work. Upload and download are fast, reliable, and the interface is intuitive. Highly recommended!',
    rating: 5,
    image: '/images/RhodeDubois.jpg',
  },
  {
    name: 'Emily Johnson',
    company: 'Creative Design Co.',
    comment:
      'As a designer, I need to access my files from anywhere. SyncData makes this process seamless and secure.',
    rating: 5,
    image: '/images/MimiKeel.jpg',
  },
  {
    name: 'Michael Brown',
    company: 'Data Analytics Ltd.',
    comment:
      'The collaborative features in SyncData have improved our team productivity by 30%. Great service!',
    rating: 4,
    image: '/images/TracyGalindo.jpg',
  },
];
