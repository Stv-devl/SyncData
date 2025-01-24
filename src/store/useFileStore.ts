import { deleteFileToParent } from 'lib/utils/deleteFileToParent';
import { filterById } from 'lib/utils/filterById';
import { findFileRecursive } from 'lib/utils/findFileRecursive';
import { updateParentDates } from 'lib/utils/updateParentDates';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { addFileToParent } from '../../lib/utils/addFileToParent';
import { flattenedFiles } from '../helpers/filterDatas/flattendedFiles';
import { deleteFilesById } from '@/helpers/deleteFilesById';
import { getDisplayFiles } from '@/helpers/filterDatas/getDisplayFiles';
import { getCurrentDate } from '@/helpers/getCurrentDate';
import { getParentFiles } from '@/helpers/getParentFiles';
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
      savedDisplayFiles: null,
      parentFolderId: 'root',
      folderStack: [],
      isUploaded: false,
      loading: false,
      error: null,

      setIsList: (value) => set(() => ({ isList: value })),

      setFiles: (files: FileType[]) => {
        set(() => ({
          files,
          displayFiles: files,
          flattenedFiles: flattenedFiles(files),
        }));
      },
      setCurrentPage: (page: number) => set({ currentPage: page }),

      setEntriesPerPage: (entries: number) => set({ entriesPerPage: entries }),

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
        });
        get().setDisplayFiles(files || []);
      },

      resetFilterTools: () =>
        set({
          filterTools: { searchbar: '', headerType: null, upselected: null },
        }),

      setFilterTools: (updates) => {
        const {
          files,
          displayFiles,
          savedDisplayFiles,
          filterTools,
          parentFolderId,
          setDisplayFiles,
        } = get();

        if (!files) return;

        const getDisplayFiles = getParentFiles(files, parentFolderId);

        if (!savedDisplayFiles && !filterTools.searchbar) {
          set({ savedDisplayFiles: displayFiles });
        }
        set((state) => ({
          filterTools: { ...state.filterTools, ...updates },
        }));

        const { upselected, searchbar } = updates;

        if (typeof upselected === 'boolean') {
          setDisplayFiles(getDisplayFiles || displayFiles);
        } else if (searchbar?.length > 0) {
          setDisplayFiles(files);
        } else {
          set({
            displayFiles: savedDisplayFiles || displayFiles,
            savedDisplayFiles: null,
          });
        }
      },

      setDisplayFiles: (files: FileType[] | null) => {
        const { flattenedFiles, filterTools, currentPage, entriesPerPage } =
          get();

        const newDisplayFiles = getDisplayFiles(
          files,
          flattenedFiles,
          filterTools,
          currentPage,
          entriesPerPage
        );

        if (
          JSON.stringify(newDisplayFiles) !== JSON.stringify(get().displayFiles)
        ) {
          set({
            displayFiles: newDisplayFiles,
          });
        }
      },

      toggleFavoriteFiles: async (fileId) => {
        const userId = get().checkUserAuthenticated();
        if (!userId) return;

        try {
          await putToggleFavorite(userId, fileId);
          set((state) => {
            const updateFavorite = (file: FileType): FileType =>
              file.id === fileId
                ? { ...file, isFavorite: !file.isFavorite }
                : file;

            return {
              files: state.files?.map(updateFavorite),
              displayFiles: state.displayFiles?.map(updateFavorite),
            };
          });
        } catch (error) {
          console.error('Error to add to favorite:', error);
          set({ error: 'Error to add to favorite' });
        }
      },

      toggleEditedFile: async (fileId: string) => {
        try {
          set((state) => {
            const toggleEdited = (file: FileType) =>
              file.id === fileId
                ? { ...file, isEdited: !file.isEdited }
                : { ...file, isEdited: file.isEdited ? false : file.isEdited };

            return {
              files: state.files?.map(toggleEdited),
              displayFiles: state.displayFiles?.map(toggleEdited),
            };
          });
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

          set((state) => {
            const updateFile = (file: FileType): FileType =>
              file.id === fileId
                ? { ...file, filename: newName, modified: newDate }
                : { ...file, files: file.files?.map(updateFile) };

            const updatedFiles = state.files?.map(updateFile);
            return {
              files: updatedFiles,
              displayFiles: state.displayFiles?.map(updateFile),
            };
          });

          console.log('Name of the file successfully updated');
        } catch (error) {
          console.error('Error updating the name:', error);
          set({ error: 'Error updating the name' });
        }
      },

      handleOpenFolder: (fileId) => {
        const {
          files,
          folderStack,
          parentFolderId,
          currentPage,
          resetFilterTools,
        } = get();

        if (!files || typeof fileId !== 'string') {
          return null;
        }
        const clickedFolder = findFileRecursive(files, fileId);

        if (
          clickedFolder &&
          !Array.isArray(clickedFolder) &&
          clickedFolder.type === 'folder'
        ) {
          set({
            parentFolderId: fileId as string,
            folderStack: [...folderStack, parentFolderId],
            currentPage: currentPage > 1 ? 1 : currentPage,
          });
          resetFilterTools();
          get().setDisplayFiles(clickedFolder.files || []);
        } else return;
      },

      handleBackFolder: () => {
        const { files, folderStack, currentPage, resetFilterTools } = get();

        if (!files || folderStack.length === 0) return;

        const previousFolderId = folderStack.at(-1); //to get last item

        if (previousFolderId) {
          const parentFiles = getParentFiles(files, previousFolderId);
          resetFilterTools();
          set({
            parentFolderId: previousFolderId,
            folderStack: folderStack.slice(0, -1),
            currentPage: currentPage > 1 ? 1 : currentPage,
          });
          get().setDisplayFiles(parentFiles || []);
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

      createFiles: async (newFile, parentId, isAccordeon) => {
        const userId = get().checkUserAuthenticated();
        const { files, parentFolderId } = get();

        if (!userId || !files) return;

        set({ loading: true, isUploaded: false });

        try {
          const response = await putAddFile(userId, parentId, newFile);

          if (!response?.file) {
            throw new Error('Invalid file response from server');
          }

          const { file } = response;

          const updatedFile = {
            ...newFile,
            url: file.url || newFile.url,
            publicId: file.publicId || null,
          };

          const updatedFiles = addFileToParent(files, updatedFile, parentId);

          const filesWithUpdatedDates = updateParentDates(
            updatedFiles,
            newFile.id,
            getCurrentDate()
          );

          const getParentsFiles = getParentFiles(
            filesWithUpdatedDates,
            parentFolderId === 'root' ? 'root' : parentId
          );

          const updatedDisplayFiles = isAccordeon
            ? getParentsFiles
            : [
                ...getParentsFiles.filter(({ id }) => id !== updatedFile.id),
                updatedFile,
              ];

          set({
            files: filesWithUpdatedDates,
            flattenedFiles: flattenedFiles(filesWithUpdatedDates),
            loading: false,
            isUploaded: true,
          });
          get().setDisplayFiles(updatedDisplayFiles);
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
        const {
          files,
          parentFolderId,
          flattenedFiles,
          displayFiles,
          currentPage,
        } = get();
        const userId = get().checkUserAuthenticated();

        if (!userId || !files) return;

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

          const idToDelete = filesToRemove.map((file) => file.id);
          const publicIdToDelete = filesToRemove
            .filter(
              (file) => file.publicId !== null && file.publicId !== undefined
            )
            .map((file) => file.publicId as string);

          await deleteFile(
            userId,
            idToDelete,
            parentFolderId,
            publicIdToDelete
          );
          console.log(
            `Files with IDs ${idToDelete.join(', ')} successfully removed.`
          );
          set((state) => {
            const updatedFiles =
              parentFolderId === 'root'
                ? filterById(state.files || [], fileId)
                : deleteFileToParent(state.files || [], fileId, parentFolderId);

            const updatedFilesWithParentDates = updateParentDates(
              updatedFiles,
              parentFolderId,
              getCurrentDate(),
              true
            );

            return {
              files: updatedFilesWithParentDates,
            };
          });
          const parentFiles = getParentFiles(files, parentFolderId);

          const updatedDisplayFiles = deleteFilesById(parentFiles, fileId);

          if (!displayFiles) return;
          const screenFiles = deleteFilesById(displayFiles, fileId);

          const changeCurrentPage =
            currentPage === 1
              ? 1
              : screenFiles && screenFiles.length > 0
              ? currentPage
              : currentPage - 1;

          get().setCurrentPage(changeCurrentPage);
          get().setDisplayFiles(updatedDisplayFiles);
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
