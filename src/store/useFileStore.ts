import { create } from 'zustand';
import { addFileToParent } from '../../lib/utils/addFileToParent';
import { findFolderById } from '../../lib/utils/findFolderById';
import { generateId } from '@/helpers/generateId';
import { getCurrentDate } from '@/helpers/getCurrentDate';
import deleteFile from '@/service/deleteFile';
import putFavorite from '@/service/putFavorite';
import putFile from '@/service/putFile';
import { useUserStore } from '@/store/useUserStore';
import { FileState } from '@/types/storeType';
import { FileType } from '@/types/type';

export const useFileStore = create<FileState>((set, get) => ({
  files: null,
  displayFiles: null,
  parentFolderId: 'root',
  folderStack: [],
  loading: false,
  error: null,

  setFiles: (files: FileType[]) => {
    set({
      files,
      displayFiles: files,
    });
  },

  setDisplayFiles: (newDisplayFiles: FileType[]) => {
    set({ displayFiles: newDisplayFiles });
  },

  toggleFavoriteFiles: async (fileId: string) => {
    const userId = get().checkUserAuthenticated();
    if (!userId) return;

    try {
      await putFavorite(userId, fileId);
    } catch (error) {
      console.error('Error to add to favorite:', error);
      set({ error: 'Error to add to favorite' });
      return;
    }

    set((state) => {
      const toggleFavoriteStatus = (file: FileType): FileType => {
        return {
          ...file,
          isFavorite: file.id === fileId ? !file.isFavorite : file.isFavorite,
          files: file.files?.map(toggleFavoriteStatus),
        };
      };
      const updatedFiles = state.files?.map(toggleFavoriteStatus);
      const updatedDisplayFiles = state.displayFiles?.map(toggleFavoriteStatus);

      return {
        files: updatedFiles,
        displayFiles: updatedDisplayFiles,
      };
    });
  },

  checkUserAuthenticated: () => {
    const { user } = useUserStore.getState();
    if (!user?._id) {
      set({ error: 'User not logged in', loading: false });
      return null;
    }
    return user._id;
  },

  resetToRoot: () => {
    const { files } = get();
    set({
      parentFolderId: 'root',
      folderStack: [],
      displayFiles: files,
    });
  },

  handleOpenFolder: (fileId) => {
    const { files, folderStack, parentFolderId } = get();

    if (!files || typeof fileId !== 'string') {
      return null;
    }
    const clickedFolder = findFolderById(files, fileId);
    if (clickedFolder) {
      set({
        parentFolderId: fileId as string,
        folderStack: [...folderStack, parentFolderId],
        displayFiles: clickedFolder.files || [],
      });
    } else {
      console.error('Folder not found');
    }
  },

  handleBackFolder: () => {
    const { files, folderStack } = get();

    if (folderStack.length > 0 && files !== null) {
      const previousFolderId = folderStack.at(-1); //to get last item
      if (!previousFolderId) return;
      const parentFolder = findFolderById(files, previousFolderId);
      if (parentFolder) {
        set({
          parentFolderId: previousFolderId,
          folderStack: folderStack.slice(0, -1),
          displayFiles: parentFolder.files || [],
        });
      } else {
        get().resetToRoot();
      }
    } else {
      get().resetToRoot();
    }
  },

  toggleFileChecked: (fileId: string | string[]) => {
    set((state) => {
      const toggleCheckedStatus = (file: FileType): FileType => {
        return {
          ...file,
          isChecked: file.id === fileId ? !file.isChecked : file.isChecked,
          files: file.files?.map(toggleCheckedStatus),
        };
      };
      const updatedFiles = state.files?.map(toggleCheckedStatus);
      const updatedDisplayFiles = state.displayFiles?.map(toggleCheckedStatus);

      return {
        files: updatedFiles,
        displayFiles: updatedDisplayFiles,
      };
    });
  },

  setAllFilesChecked: (isChecked: boolean) => {
    set((state) => {
      const updateCheckAll = (file: FileType) => ({
        ...file,
        isChecked,
      });
      const updatedDisplayFiles = state.displayFiles?.map(updateCheckAll);

      return {
        files: updatedDisplayFiles,
        displayFiles: updatedDisplayFiles,
      };
    });
  },
  resetCheckedFiles: () => {
    set((state) => {
      const resetChecked = (file: FileType) => ({
        ...file,
        isChecked: false,
      });

      const updatedDisplayFiles = state.displayFiles?.map(resetChecked);

      return {
        files: updatedDisplayFiles,
        displayFiles: updatedDisplayFiles,
      };
    });
  },

  createFiles: async ({
    name,
    parentId,
    type,
  }: {
    name: string;
    parentId: string;
    type: string;
  }) => {
    const userId = get().checkUserAuthenticated();
    if (!userId) return;

    const newFile: FileType = {
      id: generateId(),
      filename: name,
      type,
      url: '',
      files: [],
      acces: 'only you',
      modified: getCurrentDate(),
    };

    set({ loading: true });

    try {
      await putFile(userId, parentId, newFile);
      console.log('File successfully created');
      set((state) => {
        const updatedFiles = state.files
          ? addFileToParent(state.files, newFile, parentId)
          : [newFile];

        const updatedDisplayFiles =
          state.parentFolderId === parentId
            ? [...(state.displayFiles || []), newFile]
            : state.displayFiles;

        return {
          files: updatedFiles,
          displayFiles: updatedDisplayFiles,
          loading: false,
        };
      });
    } catch (error) {
      console.error('Error creating file:', error);
      set({ error: 'Error creating file', loading: false });
    }
  },

  removeFile: async (fileId: string | string[]): Promise<void> => {
    const { parentFolderId } = get();

    const userId = get().checkUserAuthenticated();
    if (!userId) return;

    try {
      await deleteFile(userId, fileId, parentFolderId);
      console.log('File successfully removed');
      set((state) => {
        const shouldRemove = (file: FileType) =>
          Array.isArray(fileId)
            ? !fileId.includes(file.id)
            : file.id !== fileId;

        const filterFilesRecursively = (files: FileType[]): FileType[] => {
          return files.filter(shouldRemove).map((file) => ({
            ...file,
            files: file.files ? filterFilesRecursively(file.files) : undefined,
          }));
        };

        const updatedFiles = state.files
          ? filterFilesRecursively(state.files)
          : [];
        const updatedDisplayFiles = state.displayFiles?.filter(shouldRemove);

        return {
          files: updatedFiles,
          displayFiles: updatedDisplayFiles,
        };
      });
    } catch {
      set({ error: 'Error removing file' });
    }
  },
}));
