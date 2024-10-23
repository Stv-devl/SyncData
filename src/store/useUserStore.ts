import { create } from 'zustand';
import { CreateFileResponse, UserState } from '@/types/storeType';
import getUsers from '@/service/getUsers';
import { addFileToParent } from '@/utils/addFileToParent';
import { getCurrentDate } from '@/utils/getCurrentDate';
import { generateId } from '@/utils/generateId';
import { FileType } from '@/types/type';
import putFile from '@/service/putFile';
import deleteFile from '@/service/deleteFile';

export const useUserStore = create<UserState>((set, get) => ({
  user: null,
  files: null,
  profile: null,
  loading: false,
  error: null,

  setUser: (user) => set({ user }),

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

  fetchData: async (userId: string): Promise<void> => {
    set({ loading: true, error: null });
    try {
      const response = await getUsers();
      const user = response.users.find((u) => u._id === userId) || null;
      if (user) {
        set({
          user: user,
          files: user.files,
          profile: user.profile,
          loading: false,
        });
      } else {
        set({ user: null, loading: false });
      }
    } catch (error) {
      const errorMsg =
        error instanceof Error ? error.message : 'An unknown error occurred';
      set({ error: errorMsg, loading: false });
    }
  },

  createFiles: async ({ name, parentId, type }) => {
    const { user } = get();

    if (!user) {
      set({ loading: false, error: 'User not logged in' });
      return;
    }
    const userId = user._id;

    try {
      const newFile: FileType = {
        id: generateId(),
        filename: name,
        type: type,
        url: '',
        files: [],
        acces: 'only you',
        modified: getCurrentDate(),
      };

      //backend
      const response: CreateFileResponse = await putFile(
        userId,
        parentId,
        newFile
      );
      console.log('File successfully created', response);
      //local
      set((state) => ({
        user: state.user
          ? {
              ...state.user,
              files: addFileToParent(state.user.files, newFile, parentId || ''),
            }
          : null,
        files: state.files
          ? addFileToParent(state.files, newFile, parentId || '')
          : [newFile],
        loading: false,
      }));
    } catch (error: unknown) {
      console.error('Error while creating file:', error);
      set({
        loading: false,
        error:
          error instanceof Error
            ? error.message
            : 'Error while creating folder',
      });
    }
  },

  /**
   * Removes a file from the backend and updates the local state.
   * @param {string} fileId - The Id of the file to remove.
   * @returns {Promise<void>} A promise that resolves when the file is removed.
   */
  removeFile: async (fileId: string | string[]): Promise<void> => {
    const { user } = get();
    if (!user) return;

    try {
      if (Array.isArray(fileId)) {
        await Promise.all(fileId.map(async (id) => deleteFile(user._id, id)));

        set((state) => ({
          files: state.files
            ? state.files.filter((file) => !fileId.includes(file.id))
            : [],
        }));
      } else {
        await deleteFile(user._id, fileId);
        set((state) => ({
          files: state.files
            ? state.files.filter((file) => file.id !== fileId)
            : [],
        }));
      }
    } catch (error) {
      console.error('Error removing file:', error);
    }
  },
}));
