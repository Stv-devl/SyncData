import { deleteFileRecursive } from 'lib/utils/deleteFileRecursive';
import { filterById } from 'lib/utils/filterById';
import { updateParentDates } from 'lib/utils/updateParentDates';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { addFileToParent } from '../../lib/utils/addFileToParent';
import { findFolderById } from '../../lib/utils/findFolderById';
import { flattenedFiles } from '../helpers/filterDatas/flattendedFiles';
import { getDisplayFiles } from '@/helpers/filterDatas/getDisplayFiles';
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
      flattenedFiles: null,
      isList: true,
      currentPage: 1,
      entriesPerPage: 1,
      filterTools: { searchbar: '', headerType: null, upselected: null },
      displayFiles: null,
      parentFolderId: 'root',
      folderStack: [],
      isUploaded: false,
      loading: false,
      error: null,

      setIsList: (value) => set(() => ({ isList: value })),

      setFiles: (files: FileType[]) => {
        set({
          files,
          displayFiles: files,
          flattenedFiles: flattenedFiles(files),
        });
      },

      setCurrentPage: (page: number) => set({ currentPage: page }),

      setEntriesPerPage: (entries: number) => set({ entriesPerPage: entries }),

      setFilterTools: (updates) => {
        set((state) => ({
          filterTools: { ...state.filterTools, ...updates },
        }));
        get().setDisplayFiles();
      },

      setDisplayFiles: () => {
        const {
          files,
          flattenedFiles,
          filterTools,
          currentPage,
          entriesPerPage,
        } = get();

        set({
          displayFiles: getDisplayFiles(
            files,
            flattenedFiles,
            filterTools,
            currentPage,
            entriesPerPage
          ),
        });
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

      setAllFilesChecked: (isChecked) => {
        set((state) => {
          const updatedDisplayFiles = state.displayFiles?.map((file) => ({
            ...file,
            isChecked,
          }));

          return {
            displayFiles: updatedDisplayFiles,
          };
        });
      },

      resetCheckedFiles: () => {
        set((state) => {
          const updatedDisplayFiles = state.displayFiles?.map((file) => ({
            ...file,
            isChecked: false,
          }));

          return {
            displayFiles: updatedDisplayFiles,
          };
        });
      },

      createFiles: async (newFile, parentId) => {
        const userId = get().checkUserAuthenticated();
        if (!userId) return;

        set({ loading: true, isUploaded: false });

        try {
          const response = await putAddFile(userId, parentId, newFile);

          if (!response || !response.file) {
            throw new Error('Invalid file response from server');
          }

          const uploadedFile = response.file;

          const updatedFile = {
            ...newFile,
            url: uploadedFile.url || newFile.url,
            publicId: uploadedFile.publicId || null,
          };

          set((state) => {
            const addFileToParentFolder = state.files
              ? addFileToParent(state.files, updatedFile, parentId)
              : [updatedFile];

            const updatedFilesWithParentDates = updateParentDates(
              addFileToParentFolder,
              newFile.id,
              getCurrentDate()
            );

            const updatedDisplayFiles =
              state.parentFolderId === parentId
                ? [...(state.displayFiles || []), updatedFile]
                : state.displayFiles;

            return {
              files: updatedFilesWithParentDates,
              displayFiles: updatedDisplayFiles,
              flattenedFiles: flattenedFiles(updatedFilesWithParentDates),
              loading: false,
              isUploaded: true,
            };
          });
        } catch (error) {
          console.error('Error creating file:', error);
          set({
            error: 'Error creating file',
            loading: false,
            isUploaded: false,
          });
        }
      },

      removeFile: async (fileId): Promise<void> => {
        const { parentFolderId, flattenedFiles } = get();
        const userId = get().checkUserAuthenticated();

        if (!userId) return;

        try {
          const filesToRemove = flattenedFiles?.filter((file) =>
            Array.isArray(fileId)
              ? fileId.includes(file.id)
              : file.id === fileId
          );
          if (!filesToRemove || filesToRemove.length === 0) {
            console.error(`No files found for the provided IDs: ${fileId}`);
            return;
          }

          const idsToDelete = filesToRemove.map((file) => file.id);
          const publicIdsToDelete = filesToRemove.map(
            (file) => file.publicId || ''
          );

          await deleteFile(
            userId,
            idsToDelete,
            parentFolderId,
            publicIdsToDelete
          );
          console.log(
            `Files with IDs ${idsToDelete.join(', ')} successfully removed.`
          );
          set((state) => {
            const updatedFiles =
              parentFolderId === 'root'
                ? filterById(state.files || [], fileId)
                : deleteFileRecursive(
                    state.files || [],
                    fileId,
                    parentFolderId
                  );

            const updatedFilesWithParentDates = updateParentDates(
              updatedFiles,
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
        } catch (error) {
          console.error('Error removing files:', error);
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
