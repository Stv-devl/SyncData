import { Collection, ObjectId } from 'mongodb';
import Image from 'next/image';
import { FormEvent, SVGProps } from 'react';

//user
export interface UserType {
  _id?: ObjectId;
  credentials?: UserCredentials;
  profile?: UserProfile;
  files?: FileType[];
  createdAt?: Date;
}

export interface ProfileType {
  profile: UserProfile;
}

export interface UserProfile {
  firstname?: string;
  lastname?: string;
  email?: string;
  image?: File | string | null;
  subscription?: string;
  subscriptionId?: string;
}

export interface UserCredentials {
  email: string;
  password: string;
}

export type HandlerContext = {
  usersCollection: Collection<UserType>;
  requestUserId: string;
};

//signup
export interface FormDataSignUp {
  email: string;
  password: string;
  repeat: string;
}
export interface UseSignUpReturn {
  handleSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleGoogleSignIn: () => Promise<void>;
  formData: FormDataSignUp;
  signupErrors: FormDataSignUp;
  isLoading: boolean;
}

//login
export interface FormDataLogin {
  email: string;
  password: string;
  general?: string;
}

export interface UseLoginReturn {
  handleSubmit: (e: FormEvent) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleGoogleSignIn: () => Promise<void>;
  formData: FormDataLogin;
  loginErrors: FormDataLogin;
  isLoading: boolean;
}

//file props
export interface FileType {
  id: string;
  filename: string;
  type: string;
  url?: string;
  modified?: string;
  isChecked?: boolean;
  isEdited?: boolean;
  isFavorite?: boolean;
  acces?: string;
  files: FileType[];
  file?: File | null;
  publicId?: string | null;
}

//nav props
export interface NavWrapperProps {
  type: string;
  isSelected: boolean;
  link: string;
  onClick?: () => void;
}

//input props
export interface CustomsInputProps {
  name: string;
  type: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  label?: string;
  placeholder?: string;
  error?: string;
  autoComplete?: string;
  IconComponent?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
}

//button component
export interface ButtonComponent {
  label: string | JSX.Element;
  onClick?: (e: FormEvent) => void;
  type?: 'button' | 'submit';
  color?: 'empty' | 'full';
  iconSrc?: string;
  disabled?: boolean;
  IconComponent?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  iconColor?: string;
}

export interface ButtonWrapperProps {
  actionLabel: string;
  handleAction: (e: FormEvent) => void;
}

//icon
export interface IconType {
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  type: string;
}

export interface IconCustomProps extends SVGProps<SVGSVGElement> {
  width?: number;
  height?: number;
  fill?: string;
  className?: string;
}

export interface IconsListWrapperProps {
  file: FileType;
  handleIconClick: (icon: IconType, file: FileType) => void;
  handleClickOpen: (
    e: React.MouseEvent,
    filename: string,
    rect: DOMRect,
    fileId: string
  ) => void;
  handleMouseEnter: (
    e: React.MouseEvent,
    iconType: string,
    transform: string
  ) => void;
  handleMouseLeave: () => void;
  index: number;
}

//search
export interface SearchProps {
  searchBar: string;
  handleChange: (value: { [key: string]: string }) => void;
  placeholder: string;
}

//toolbar
export type ToolsBarWrapperProps = {
  label: string;
  icon: React.FunctionComponent<SVGProps<SVGSVGElement>>;
  color?: 'empty' | 'full' | undefined;
  iconColor?: string;
  onClick: () => void;
};

//array
export interface HeaderProps {
  isList: boolean;
  setFilesChecked: (isChecked: boolean) => void;
}

export interface ArrayListContentProps {
  files: FileType[];
  updateFileName: (fileId: string, newName: string, fileName: string) => void;
  handleOpenFolder: (fileId: string) => void;
  toggleFileChecked: (fileId: string) => void;
  handleClickOpen: (
    event: React.MouseEvent,
    label: string,
    rect: DOMRect,
    fileId: string
  ) => void;
  handleMouseEnter: (
    event: React.MouseEvent,
    label: string,
    transformStyle: string
  ) => void;
  handleMouseLeave: () => void;
  toggleEditedFile: (fileId: string) => void;
  containerRef: React.RefObject<HTMLUListElement>;
}

export interface ArrayFileContentProps {
  files: FileType[];
  updateFileName: (fileId: string, newName: string, fileName: string) => void;
  toggleEditedFile: (fileId: string) => void;
  handleOpenFolder: (fileId: string) => void;
  toggleFileChecked: (fileId: string) => void;
  handleClickOpen: (
    event: React.MouseEvent,
    label: string,
    rect: DOMRect,
    fileId: string
  ) => void;
  containerRef: React.RefObject<HTMLUListElement>;
}

//accordion
export interface AccordionMenuProps {
  files: FileType[] | FileType | null;
  handleCheck: (fileId: string, isChecked: boolean) => void;
  checkedFile: string | null;
  toggleOpen: (fileId: string) => void;
  isOpen: (fileId: string) => boolean;
}

export interface AccordionItemProps {
  file: FileType;
  handleCheck: (fileId: string, isChecked: boolean) => void;
  checkedFile: string | null;
  toggleOpen: (fileId: string) => void;
  isOpen: (fileId: string) => boolean;
}

export interface IconWrapperProps {
  type: string;
  className?: string;
}

export interface InfoWrapperProps {
  fileName: string | null;
  fileId: string | null;
}

export interface ModaleFileProps {
  fileId?: string | string[];
  fileName?: string | string[];
}

export interface FilterSortProps {
  type: string;
  selectedType: string | null;
  isUp: boolean | null;
  onClick: (type: string | null) => void;
}

export interface ChangeNameProps {
  file: FileType;
  isFile: boolean;
  name: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  placeholder: string;

  autoComplete: string;
  toggleEditedFile: (fileId: string) => void;
  validateName: (fileId: string, fileName: string) => void;
  error: string | null;
}

//dropzone props
export interface DropZoneWrapperProps {
  isDragIcon: boolean | null;
  dropFolderId: string;
  dropStyle: string;
}

//use file edition hook
export interface UseFileEditionProps {
  files: FileType[];
  toggleEditedFile: (fileId: string) => void;
  updateFileName: (fileId: string, newName: string, fileName: string) => void;
}

//use pagination hook
export interface UsePaginationProps {
  pageNumber: number;
  currentPage: number;
}

//profile

export interface ProfileWrapperProps {
  profile: UserProfile | null;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  profilErrors: Record<string, string>;
}

export interface ProfilePictureWrapperProps {
  imagePreview: string | null;
  handleImageChange: (file: File) => void;
}

export interface ProfileErrors {
  firstname: string;
  lastname: string;
  email: string;
  [key: string]: string;
}

//stripe plan
export interface Plan {
  key: string;
  name?: string;
  price: string;
  storage?: string;
  features?: string[];
  buttonLabel?: string;
}

export interface Testimonial {
  name: string;
  company: string;
  comment: string;
  rating: number;
  image: string;
}

export interface TestimonialCardProps {
  testimonial: Testimonial;
}
