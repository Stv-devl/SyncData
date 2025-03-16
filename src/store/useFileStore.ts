import { deleteFileToParent } from 'lib/utils/fileOperations/deleteFileToParent';
import { filterById } from 'lib/utils/fileOperations/filterById';
import { findFileRecursive } from 'lib/utils/fileOperations/findFileRecursive';
import { updateParentDates } from 'lib/utils/fileOperations/updateParentDates';
import isEqual from 'lodash/isEqual';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { addFileToParent } from '../../lib/utils/fileOperations/addFileToParent';
import { flattenedFiles } from '../helpers/filterDatas/flattenedFiles';
import { getDisplayFiles } from '@/helpers/filterDatas/getDisplayFiles';
import { findFavoriteFiles } from '@/helpers/findFavoriteFiles';
import { getCurrentDate } from '@/helpers/getCurrentDate';
import { getParentFiles } from '@/helpers/getParentFiles';
import { removeFilesById } from '@/helpers/removeFilesById';
import { updatePageStatus } from '@/helpers/updatePageStatus';
import deleteFile from '@/service/deleteFile';
import patchFavorite from '@/service/patchFavorite';
import patchFileName from '@/service/patchFileName';
import postAddFile from '@/service/postAddFile';
import { useUserStore } from '@/store/useUserStore';
import { FileState } from '@/types/storeType';
import { FileType } from '@/types/type';

/**
 * Zustand store for managing file state and operations.
 * Provides state variables and actions to handle files, folders, favorites, and display settings.
 *
 * @interface FileState
 * @property {FileType[] | null} files - Array of all files in the system
 * @property {FileType[] | null} flattenedFiles - Flattened array of all files
 * @property {boolean} isList - Display mode toggle between list and grid view
 * @property {boolean} isFavoritePage - Whether currently viewing favorites page
 * @property {number} currentPage - Current page number for pagination
 * @property {number} entriesPerPage - Number of entries to display per page
 * @property {Object} filterTools - Tools for filtering and searching files
 * @property {FileType[] | null} displayFavoritesFiles - Files to display in favorites view
 * @property {FileType[] | null} displayFiles - Currently displayed files
 * @property {string} parentFolderId - ID of current parent folder
 * @property {string[]} folderStack - Stack of parent folder IDs for navigation
 * @property {boolean} isUploaded - Whether a file upload is complete
 * @property {boolean} loading - Loading state indicator
 * @property {string | null} error - Error message if any
 */
export const useFileStore = create<FileState>()(
  persist(
    (set, get) => ({
      files: null,
      flattenedFiles: null,
      isList: true,
      isFavoritePage: false,
      currentPage: 1,
      entriesPerPage: 1,
      filterTools: { searchbar: '', headerType: null, upselected: null },
      displayFavoritesFiles: null,
      displayFiles: null,
      parentFolderId: 'root',
      folderStack: [],
      isUploaded: false,
      loading: false,
      error: null,

      /**
       * Sets the list view.
       * @param {boolean} value - The value to set.
       */
      setIsList: (value) => set(() => ({ isList: value })),

      /**
       * Sets the favorite page.
       * @param {boolean} value - The value to set.
       */
      setIsFavoritePage: (value) => set(() => ({ isFavoritePage: value })),

      /**
       * Sets the files in the store.
       * @param {FileType[]} files - The files to set.
       */
      setFiles: (files: FileType[]) => {
        const newFlattenedFiles = flattenedFiles(files);
        set(() => ({
          files,
          displayFiles: files,
          flattenedFiles: newFlattenedFiles,
        }));
      },

      /**
       * Sets the current page.
       * @param {number} page - The current page.
       */
      setCurrentPage: (page: number) => set({ currentPage: page }),

      /**
       * Sets the number of entries per page.
       * @param {number} entries - The number of entries per page.
       */
      setEntriesPerPage: (entries: number) => set({ entriesPerPage: entries }),

      /**
       * Updates the display files based on the filter conditions.
       * @param {FileType[]} files - The files to display.
       */
      updateDisplayFiles: (files: FileType[]) => {
        const {
          flattenedFiles,
          filterTools,
          currentPage,
          isFavoritePage,
          entriesPerPage,
          displayFiles,
          displayFavoritesFiles,
        } = get();

        //flattenedFile est bon trouver l'autre erreur
        console.log('files dans updateDisplayFiles', files);
        console.log('flattended files dans updateDisplayFiles', flattenedFiles);
        console.log('filterTools dans updateDisplayFiles', filterTools);
        const newDisplayFiles = getDisplayFiles(
          files,
          flattenedFiles,
          filterTools,
          currentPage,
          entriesPerPage
        );

        console.log('newDisplayFiles dans updateDisplayFiles', newDisplayFiles);

        const currentFiles = isFavoritePage
          ? displayFavoritesFiles
          : displayFiles;

        if (!isEqual(newDisplayFiles, currentFiles)) {
          set(
            isFavoritePage
              ? { displayFavoritesFiles: newDisplayFiles }
              : { displayFiles: newDisplayFiles }
          );
        }
      },

      /**
       * Sets the display files to the files.
       * @param {FileType[]} files - The files to display.
       */
      setDisplayFiles: (files: FileType[] | null) => {
        if (!files) return;
        get().updateDisplayFiles(files);
        set({ flattenedFiles: flattenedFiles(files) }); //ok du coup voir si flattened au setFile est nécessaire
      },

      /**
       * Sets the display files to the favorite files.
       * @param {FileType[]} files - The files to display.
       */
      setDisplayFavoritesFile: (files: FileType[]) => {
        if (!files) return;
        const { isFavoritePage } = get();
        if (!isFavoritePage) return;
        const favoriteFiles = findFavoriteFiles(files);
        console.log(
          'favoriteFiles dans setDisplayFavoritesFile',
          favoriteFiles
        );
        get().updateDisplayFiles(favoriteFiles);
        set({ flattenedFiles: flattenedFiles(favoriteFiles) });
      },

      /**
       * Resets the display files to the root folder.
       */
      resetToRoot: () => {
        const { files } = get();

        set({
          parentFolderId: 'root',
          folderStack: [],
        });
        get().setDisplayFiles(files || []);
      },

      /**
       * Resets the checked files to their default state.
       */
      resetCheckedFiles: () => get().setFilesChecked(false),

      /**
       * Resets the filter tools to their default state.
       */
      resetFilterTools: () =>
        set({
          filterTools: { searchbar: '', headerType: null, upselected: null },
        }),

      /**
       * Sets the filter tools and updates the display files based on the filter conditions.
       * @param {Object} updates - The filter updates to apply.
       */
      setFilterTools: (updates) => {
        const {
          files,
          displayFiles,
          isFavoritePage,
          parentFolderId,
          setDisplayFavoritesFile,
          setDisplayFiles,
        } = get();

        if (!files) return;

        const getDisplayFiles = getParentFiles(files, parentFolderId);
        const { upselected, searchbar } = updates;

        set((state) => ({
          filterTools: { ...state.filterTools, ...updates },
        }));

        if (!isFavoritePage) {
          if (typeof upselected === 'boolean') {
            setDisplayFiles(getDisplayFiles || displayFiles);
          } else if (searchbar?.length > 0) {
            setDisplayFiles(files);
          } else {
            setDisplayFiles(files);
          }
        } else {
          setDisplayFavoritesFile(files);
        }
      },

      /**
       * Updates the state of a file.
       * @param {Function} updateState - A function that updates the file state.
       */
      updateFileState: (updateState: (file: FileType) => FileType) => {
        set((state) => ({
          files: state.files?.map(updateState) || [],
          displayFiles: state.displayFiles?.map(updateState) || [],
        }));
      },

      /**
       * Toggles the favorite status of a file.
       * @param {string} fileId - The ID of the file to toggle.
       */
      toggleFavoriteFiles: async (fileId) => {
        const { files, displayFavoritesFiles, parentFolderId, currentPage } =
          get();

        const userId = useUserStore.getState().getUserId();
        if (!userId || !files) return;

        try {
          await patchFavorite(userId, fileId, 'updateFavorite');

          get().updateFileState((file) =>
            file.id === fileId
              ? { ...file, isFavorite: !file.isFavorite }
              : file
          );

          const parentFiles = getParentFiles(files, parentFolderId);
          const updatedFavorites = removeFilesById(parentFiles || [], fileId);

          if (!displayFavoritesFiles) return;
          const screenFiles = removeFilesById(displayFavoritesFiles, fileId);

          const changeCurrentPage = updatePageStatus(screenFiles, currentPage);

          get().setCurrentPage(changeCurrentPage);
          get().setDisplayFavoritesFile(updatedFavorites);
        } catch (error) {
          console.error('Error toggling favorite:', error);
          set({ error: 'Error toggling favorite' });
        }
      },

      /**
       * Toggles the edited status of a file.
       * @param {string} fileId - The ID of the file to toggle.
       */
      toggleEditedFile: async (fileId: string) => {
        try {
          get().updateFileState((file) =>
            file.id === fileId
              ? { ...file, isEdited: !file.isEdited }
              : { ...file, isEdited: false }
          );
        } catch (error) {
          console.error('Error to edit the file:', error);
          set({ error: 'Error to edit the file' });
        }
      },

      /**
       * Updates the name of a file.
       * @param {string} fileId - The ID of the file to update.
       * @param {string} newName - The new name for the file.
       * @param {string} fileName - The current name of the file.
       */
      updateFileName: async (fileId, newName, fileName) => {
        const userId = useUserStore.getState().getUserId();
        if (!userId || fileName === newName) return;

        const newDate = getCurrentDate();

        try {
          await patchFileName(userId, fileId, newName, 'updateName');

          get().updateFileState((file) =>
            file.id === fileId
              ? { ...file, filename: newName, modified: newDate }
              : file
          );
          console.log('Name of the file successfully updated');
        } catch (error) {
          console.error('Error updating the name:', error);
          set({ error: 'Error updating the name' });
        }
      },

      /**
       * Navigates to a specific folder.
       * @param {string | null} folderId - The ID of the folder to navigate to.
       */
      navigateToFolder: (folderId: string | null) => {
        const { files, currentPage, resetFilterTools, resetCheckedFiles } =
          get();
        if (!files || !folderId) return;

        const targetFiles =
          folderId === 'root' ? files : getParentFiles(files, folderId);

        const newFolderStack =
          folderId === 'root'
            ? []
            : [...get().folderStack, get().parentFolderId];

        resetFilterTools();
        resetCheckedFiles();
        set({
          parentFolderId: folderId,
          folderStack: newFolderStack,
          currentPage: currentPage > 1 ? 1 : currentPage,
        });

        get().setDisplayFiles(targetFiles || []);
      },

      /**
       * Handles opening a folder and go to next folder.
       * @param {string | string[]} fileId - The ID of the file to open.
       */
      handleOpenFolder: (fileId: string | string[]) => {
        const { files } = get();
        if (!files || typeof fileId !== 'string') return;

        const clickedFolder = findFileRecursive(files, fileId);
        if (
          clickedFolder &&
          !Array.isArray(clickedFolder) &&
          clickedFolder.type === 'folder'
        ) {
          get().navigateToFolder(fileId);
        }
      },

      /**
       * Handles going back to the previous folder.
       */
      handleBackFolder: () => {
        const { folderStack, currentPage } = get();
        if (folderStack.length === 0) {
          get().resetToRoot();
        } else {
          const previousFolderId = folderStack.at(-1);
          if (previousFolderId) {
            console.log('navigateToFolder');
            get().navigateToFolder(previousFolderId);
            set({
              folderStack: folderStack.slice(0, -1),
              currentPage: currentPage > 1 ? 1 : currentPage,
            });
          }
        }
      },

      /**
       * Toggles the checked status of a file.
       * @param {string | string[]} fileId - The ID of the file to toggle.
       */
      toggleFileChecked: (fileId: string | string[]) => {
        get().updateFileState((file) => {
          const shouldToggle = Array.isArray(fileId)
            ? fileId.includes(file.id)
            : file.id === fileId;
          return {
            ...file,
            isChecked: shouldToggle ? !file.isChecked : file.isChecked,
          };
        });
      },
      setFilesChecked: (isChecked: boolean) => {
        get().updateFileState((file) => ({ ...file, isChecked }));
      },

      /**
       * Creates new files in the store and uploads them to the server
       * @param {Object} newFile - The new file object to create
       * @param {string} parentId - ID of the parent folder where the file will be created
       * @param {boolean} isAccordeon - Whether the file is being created in accordion mode
       */
      createFiles: async (newFile, parentId, isAccordeon) => {
        const userId = useUserStore.getState().getUserId();
        const { files, parentFolderId } = get();

        if (!userId || !files) return;
        set({ loading: true, isUploaded: false });

        try {
          const response = await postAddFile(userId, parentId, newFile);

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
            : getParentsFiles.map((file) =>
                file.id === updatedFile.id ? updatedFile : file
              );

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

      /**
       * Removes a file or multiple files.
       * @param {string | string[]} fileId - ID(s) of the file(s) to delete.
       */
      removeFile: async (fileId): Promise<void> => {
        const {
          files,
          parentFolderId,
          flattenedFiles,
          displayFiles,
          currentPage,
        } = get();
        const userId = useUserStore.getState().getUserId();

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
          const updatedDisplayFiles = removeFilesById(parentFiles, fileId);

          if (!displayFiles) return;
          const screenFiles = removeFilesById(displayFiles, fileId);

          const changeCurrentPage = updatePageStatus(screenFiles, currentPage);

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
