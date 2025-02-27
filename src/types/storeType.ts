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
  openModal: (
    type: string,
    fileId?: string | string[],
    fileName?: string | string[]
  ) => void;
  closeModal: () => void;
}

export interface UserState {
  user: UserType | null;
  profile: UserProfile | null;
  loading: boolean;
  error: string | null;
  setUser: (user: UserType) => void;
  fetchData: (userId: string) => Promise<void>;
  getUserId: () => string | undefined;
}

export type FilterToolsProps = {
  headerType: keyof FileType | null;
  upselected: boolean | null;
  searchbar: string;
};

export interface FileState {
  files: FileType[] | null;
  flattenedFiles: FileType[] | null;
  isList: boolean;
  isFavoritePage: boolean;
  isUploaded: boolean;
  currentPage: number;
  entriesPerPage: number;
  displayFiles: FileType[] | null;
  savedDisplayFiles: FileType[] | null;
  displayFavoritesFiles: FileType[] | null;
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
  updateDisplayFiles: (files: FileType[], isFavorite?: boolean) => void;
  resetFilterTools: () => void;
  setFilterTools: (updates: FilterToolsProps) => void;
  updateFileState: (updateState: (file: FileType) => FileType) => void;
  toggleEditedFile: (fileId: string) => Promise<void>;
  toggleFavoriteFiles: (fileId: string) => Promise<void>;
  updateFileName: (
    fileId: string,
    newName: string,
    fileName: string
  ) => Promise<void>;
  resetToRoot: () => void;
  navigateToFolder: (folderId: string | null) => void;
  handleOpenFolder: (fileId: string | string[]) => void;
  handleBackFolder: () => void;
  toggleFileChecked: (fileId: string | string[]) => void;
  setFilesChecked: (isChecked: boolean) => void;
  resetCheckedFiles: () => void;
  createFiles: (
    newFile: FileType,
    parentId: string,
    isAccordeon: boolean
  ) => Promise<void>;
  removeFile: (fileId: string | string[]) => Promise<void>;
  setDisplayFavoritesFile: (files: FileType[]) => void;
  setIsFavoritePage: (value: boolean) => void;
}

export interface CreateFileResponse {
  userId: string;
  file: FileType;
  parentId: string;
  type: string;
}
