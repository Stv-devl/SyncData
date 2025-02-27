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
      savedDisplayFiles: null,
      parentFolderId: 'root',
      folderStack: [],
      isUploaded: false,
      loading: false,
      error: null,

      setIsList: (value) => set(() => ({ isList: value })),

      setIsFavoritePage: (value) => set(() => ({ isFavoritePage: value })),

      setFiles: (files: FileType[]) => {
        const newFlattenedFiles = flattenedFiles(files);
        set(() => ({
          files,
          displayFiles: files,
          flattenedFiles: newFlattenedFiles,
        }));
      },

      setCurrentPage: (page: number) => set({ currentPage: page }),

      setEntriesPerPage: (entries: number) => set({ entriesPerPage: entries }),

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

        const newDisplayFiles = getDisplayFiles(
          files,
          flattenedFiles,
          filterTools,
          currentPage,
          entriesPerPage
        );

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

      setDisplayFiles: (files: FileType[] | null) => {
        if (!files) return;
        get().updateDisplayFiles(files);
        set({ flattenedFiles: flattenedFiles(files) }); //ok du coup voir si flattened au setFile est nécessaire
      },

      setDisplayFavoritesFile: (files: FileType[]) => {
        if (!files) return;
        const favoriteFiles = findFavoriteFiles(files);
        get().updateDisplayFiles(favoriteFiles);
        set({ flattenedFiles: flattenedFiles(favoriteFiles) });
      },

      resetToRoot: () => {
        const { files } = get();
        set({
          parentFolderId: 'root',
          folderStack: [],
        });
        get().setDisplayFiles(files || []);
      },

      resetCheckedFiles: () => get().setFilesChecked(false),

      resetFilterTools: () =>
        set({
          filterTools: { searchbar: '', headerType: null, upselected: null },
        }),

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

      updateFileState: (updateState: (file: FileType) => FileType) => {
        set((state) => ({
          files: state.files?.map(updateState) || [],
          displayFiles: state.displayFiles?.map(updateState) || [],
        }));
      },

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
