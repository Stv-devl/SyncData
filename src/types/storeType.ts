import { FileType, UserProfile, UserType } from './type';

export interface BurgerState {
  isOpen: boolean;
  toggleBurger: () => void;
}

export interface PopupState {
  isOpen: boolean;
  content: string | null;
  x: number;
  y: number;
  transformStyle: string | null;
  isInfo: boolean;
  closePopup: () => void;
  handleClickOpen: (
    event: React.MouseEvent,
    label: string,
    rect: DOMRect | { x: number; y: number }
  ) => void;
  handleClickClose: (event: MouseEvent) => void;
  handleMouseEnter: (
    event: React.MouseEvent,
    label: string,
    transformStyle: string
  ) => void;
  handleMouseLeave: () => void;
}

export interface ModalState {
  isOpen: boolean;
  type: string | null;
  closeModal: () => void;
  openModal: (type: string) => void;
}

export interface UserState {
  user: UserType | null;
  files: FileType[] | null;
  profile: UserProfile | null;
  loading: boolean;
  error: string | null;
  setUser: (user: UserType) => void;
  fetchData: () => Promise<void>;
  createFolder: (payload: { name: string; parentId?: string }) => Promise<void>;
  uploadFolder: (payload: { name: string; parentId?: string }) => Promise<void>;
}
