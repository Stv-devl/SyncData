import { FileType, UserProfile, UserType } from './type';

export interface BurgerState {
  isOpen: boolean;
  toggleBurger: () => void;
}

export interface PopupState {
  isOpen: boolean;
  content: string | null;
  fileId?: string | null;
  x: number;
  y: number;
  transformStyle: string | null;
  isInfo: boolean;
  closePopup: () => void;
  handleClickOpen: (
    event: React.MouseEvent,
    label: string,
    rect: DOMRect | { x: number; y: number },
    fileId: string
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
  fileId?: string | null;
  closeModal: () => void;
  openModal: (type: string, fileId: string) => void;
}

export interface UserState {
  user: UserType | null;
  files: FileType[] | null;
  profile: UserProfile | null;
  loading: boolean;
  error: string | null;
  setUser: (user: UserType) => void;
  fetchData: (userId: string) => Promise<void>;
  createFiles: (payload: {
    name: string;
    parentId: string;
    type: string;
  }) => Promise<void>;
  removeFile: (fileId: string) => Promise<void>;
}

export interface CreateFileResponse {
  userId: string;
  file: FileType;
  parentId: string;
  type: string;
}
