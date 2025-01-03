import { deleteFileRecursive } from 'lib/utils/deleteFileRecursive';
import { filterById } from 'lib/utils/filterById';
import { updateParentDates } from 'lib/utils/updateParentDates';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { addFileToParent } from '../../lib/utils/addFileToParent';
import { findFolderById } from '../../lib/utils/findFolderById';
import { createNewFile } from '@/helpers/createNewFile';
import { getCurrentDate } from '@/helpers/getCurrentDate';
import deleteFile from '@/service/deleteFile';
import putAddFile from '@/service/putAddFile';
import putFileName from '@/service/putFileName';
import putToggleFavorite from '@/service/putToggleFavorite';
import { useUserStore } from '@/store/useUserStore';
import { FileState } from '@/types/storeType';
import { FileType } from '@/types/type';

export const useFileStore = create<FileState>()(
  persist(
    (set, get) => ({
      files: null,
      isList: true,
      displayFiles: null,
      parentFolderId: 'root',
      folderStack: [],
      loading: false,
      error: null,

      setIsList: (value) => set(() => ({ isList: value })),

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
          await putToggleFavorite(userId, fileId);

          const toggleFavorite = (file: FileType) =>
            file.id === fileId
              ? { ...file, isFavorite: !file.isFavorite }
              : file;

          set((state) => ({
            files: state.files?.map(toggleFavorite),
            displayFiles: state.displayFiles?.map(toggleFavorite),
          }));
        } catch (error) {
          console.error('Error to add to favorite:', error);
          set({ error: 'Error to add to favorite' });
        }
      },

      toggleEditedFile: async (fileId: string) => {
        try {
          const toggleEdited = (file: FileType) =>
            file.id === fileId
              ? { ...file, isEdited: !file.isEdited }
              : { ...file, isEdited: file.isEdited ? false : file.isEdited };

          set((state) => ({
            files: state.files?.map(toggleEdited),
            displayFiles: state.displayFiles?.map(toggleEdited),
          }));
        } catch (error) {
          console.error('Error to edit the file:', error);
          set({ error: 'Error to edit the file' });
        }
      },

      updateFileName: async (fileId, newName, fileName) => {
        const userId = get().checkUserAuthenticated();

        if (!userId || fileName === newName) return;

        const newDate = getCurrentDate();

        try {
          await putFileName(userId, fileId, newName);

          const updateFile = (file: FileType): FileType => ({
            ...file,
            filename: file.id === fileId ? newName : file.filename,
            modified: file.id === fileId ? newDate : file.modified,
            files: file.files ? file.files.map(updateFile) : [],
          });

          set((state) => {
            const updatedFiles = state.files ? state.files.map(updateFile) : [];
            const updatedDisplayFiles = state.displayFiles
              ? state.displayFiles.map(updateFile)
              : [];

            const filesWithUpdatedParentsDate = updateParentDates(
              updatedFiles,
              fileId,
              newDate
            );

            return {
              files: filesWithUpdatedParentsDate,
              displayFiles: updatedDisplayFiles,
            };
          });

          console.log('Name of the file successfully updated');
        } catch (error) {
          console.error('Error to update the name:', error);
          set({ error: 'Error to update the name' });
        }
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

        if (clickedFolder && clickedFolder.type === 'folder') {
          set({
            parentFolderId: fileId as string,
            folderStack: [...folderStack, parentFolderId],
            displayFiles: clickedFolder.files || [],
          });
        } else return;
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
          const updatedDisplayFiles =
            state.displayFiles?.map(toggleCheckedStatus);

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

      createFiles: async ({ name, parentId, type }) => {
        const userId = get().checkUserAuthenticated();
        if (!userId) return;

        console.log(name, parentId, type);

        const newFile: FileType = createNewFile(name, type);

        console.log(newFile);

        set({ loading: true });

        try {
          await putAddFile(userId, parentId, newFile);
          console.log('File successfully created');

          set((state) => {
            const addFileToParentFolder = state.files
              ? addFileToParent(state.files, newFile, parentId)
              : [newFile];

            const updatedFilesWithParentDates = updateParentDates(
              addFileToParentFolder,
              newFile.id,
              getCurrentDate()
            );

            const updatedDisplayFiles =
              state.parentFolderId === parentId
                ? [...(state.displayFiles || []), newFile]
                : state.displayFiles;

            return {
              files: updatedFilesWithParentDates,
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
            const removeFileFromFolder =
              parentFolderId === 'root'
                ? filterById(state.files || [], fileId)
                : deleteFileRecursive(
                    state.files || [],
                    fileId,
                    parentFolderId
                  );

            const updatedFilesWithParentDates = updateParentDates(
              removeFileFromFolder,
              parentFolderId,
              getCurrentDate(),
              true
            );

            const updatedDisplayFiles = state.displayFiles?.filter((file) =>
              Array.isArray(fileId)
                ? !fileId.includes(file.id)
                : file.id !== fileId
            );
            return {
              files: updatedFilesWithParentDates,
              displayFiles: updatedDisplayFiles,
            };
          });
        } catch {
          set({ error: 'Error removing file' });
        }
      },
    }),
    {
      name: 'file-store',
      partialize: (state) => ({ isList: state.isList }),
    }
  )
);
