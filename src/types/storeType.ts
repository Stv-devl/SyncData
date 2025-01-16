import { files } from '../../../syncdata copy/src/constantes/files';
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
  fileId?: string | string[] | null;
  fileName?: string | string[] | null;
  closeModal: () => void;
  openModal: (
    type: string,
    fileId: string | string[],
    fileName: string | string[]
  ) => void;
}

export interface UserState {
  user: UserType | null;
  profile: UserProfile | null;
  loading: boolean;
  error: string | null;
  setUser: (user: UserType) => void;
  fetchData: (userId: string) => Promise<void>;
}

//filtertool
export type FilterToolsProps = {
  headerType: keyof FileType | null;
  upselected: boolean | null;
  searchbar: string;
};

export interface FileState {
  files: FileType[] | null;
  flattenedFiles: FileType[] | null;
  isList: boolean;
  isUploaded: boolean;
  currentPage: number;
  entriesPerPage: number;
  displayFiles: FileType[] | null;
  savedDisplayFiles: FileType[] | null;
  filterTools: FilterToolsProps;
  parentFolderId: string;
  folderStack: string[];
  loading: boolean;
  error: string | null;
  setFiles: (files: FileType[]) => void;
  setIsList: (value: boolean) => void;
  setCurrentPage: (value: number) => void;
  setEntriesPerPage: (value: number) => void;
  setDisplayFiles: (files: FileType[] | null) => void;
  setFilterTools: (updates: FilterToolsProps) => void;
  toggleEditedFile: (fileId: string) => Promise<void>;
  toggleFavoriteFiles: (fileId: string) => Promise<void>;
  updateFileName: (
    fileId: string,
    newName: string,
    fileName: string
  ) => Promise<void>;
  checkUserAuthenticated: () => string | null;
  resetToRoot: () => void;
  handleOpenFolder: (fileId: string | string[]) => void;
  handleBackFolder: () => void;
  toggleFileChecked: (fileId: string | string[]) => void;
  setAllFilesChecked: (isChecked: boolean) => void;
  resetCheckedFiles: () => void;
  createFiles: (newFile: FileType) => Promise<void>;
  removeFile: (fileId: string | string[]) => Promise<void>;
}

export interface CreateFileResponse {
  userId: string;
  file: FileType;
  parentId: string;
  type: string;
}
