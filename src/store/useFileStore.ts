import { create } from 'zustand';
import { addFileToParent } from '@/helpers/addFileToParent';
import { generateId } from '@/helpers/generateId';
import { getClickedFolder } from '@/helpers/getClickedFolder';
import { getCurrentDate } from '@/helpers/getCurrentDate';
import deleteFile from '@/service/deleteFile';
import putFile from '@/service/putFile';
import { useUserStore } from '@/store/useUserStore';
import { FileState } from '@/types/storeType';
import { FileType } from '@/types/type';

export const useFileStore = create<FileState>((set, get) => ({
  files: null,
  currentFolder: 'root',
  folderHistory: [],
  loading: false,
  error: null,

  setFiles: (files: FileType[]) => set({ files }),

  handleOpenFolder: (fileId: string) => {
    const { files, currentFolder, folderHistory } = get();
    const clickedFolder = getClickedFolder(files, fileId);

    if (clickedFolder) {
      set({
        currentFolder: clickedFolder.filename,
        files: clickedFolder.files,
        folderHistory: [
          ...folderHistory,
          { folder: currentFolder, files: files || [] },
        ],
      });
    }
  },

  handleBackFolder: () => {
    const { folderHistory, files } = get();
    const previousFolder = folderHistory[folderHistory.length - 1];

    if (previousFolder) {
      set({
        currentFolder: previousFolder.folder,
        files: previousFolder.files,
        folderHistory: folderHistory.slice(0, -1),
      });
    } else {
      set({
        currentFolder: 'root',
        files,
        folderHistory: [],
      });
    }
  },

  toggleFileChecked: (fileId: string) =>
    set((state) => ({
      files: state.files
        ? state.files.map((file) =>
            file.id === fileId ? { ...file, isChecked: !file.isChecked } : file
          )
        : [],
    })),

  setAllFilesChecked: (isChecked: boolean) =>
    set((state) => ({
      files: state.files
        ? state.files.map((file) => ({
            ...file,
            isChecked,
          }))
        : [],
    })),

  resetCheckedFiles: () =>
    set((state) => ({
      files: state.files
        ? state.files.map((file) => ({
            ...file,
            isChecked: false,
          }))
        : [],
    })),

  createFiles: async ({ name, parentId, type }) => {
    const { user } = useUserStore.getState();
    const userId = user?._id;

    if (!userId) {
      set({ error: 'User not logged in', loading: false });
      return;
    }

    const newFile: FileType = {
      id: generateId(),
      filename: name,
      type: type,
      url: '',
      files: [],
      acces: 'only you',
      modified: getCurrentDate(),
    };

    set({ loading: true });
    try {
      const response = await putFile(userId, parentId, newFile);
      console.log('File successfully created', response);

      set((state) => ({
        files: state.files
          ? addFileToParent(state.files, newFile, parentId)
          : [newFile],
        loading: false,
      }));
    } catch {
      set({ error: 'Error creating file', loading: false });
    }
  },

  removeFile: async (fileId: string | string[]): Promise<void> => {
    const { files } = get();
    const { user } = useUserStore.getState();
    const userId = user?._id;

    if (!userId) {
      set({ error: 'User not logged in' });
      return;
    }

    try {
      if (Array.isArray(fileId)) {
        await Promise.all(fileId.map(async (id) => deleteFile(userId, id)));
        set({ files: files?.filter((file) => !fileId.includes(file.id)) });
      } else {
        await deleteFile(userId, fileId);
        set({ files: files?.filter((file) => file.id !== fileId) });
      }
    } catch {
      set({ error: 'Error removing file' });
    }
  },
}));
