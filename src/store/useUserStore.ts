import { create } from 'zustand';
import { userData } from '@/constantes/user';
import { getCurrentDate } from '@/utils/getCurrentDate';
import { generateId } from '@/utils/generateId';
import { addFileToParent } from '@/utils/addFileToParent';
import { UserState } from '@/types/storeType';
import { FileType } from '@/types/type';
import { getFileType } from '@/utils/getFileType';

export const useUserStore = create<UserState>((set) => ({
  user: null,
  files: null,
  profile: null,
  loading: false,
  error: null,

  setUser: (user) => set({ user }),

  fetchData: async (): Promise<void> => {
    const userId = '61e4d0e8c9b4c1a6c4a5a2a3';
    set({ loading: true, error: null });
    try {
      const response = userData;
      const user = response.find((u) => u._id === userId) || null;
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

  createFolder: async ({ name, parentId }) => {
    set({ loading: true, error: null });
    try {
      const newFile: FileType = {
        id: generateId(),
        filename: name,
        type: 'folder',
        url: '',
        files: [],
        acces: 'only you',
        modified: getCurrentDate(),
      };

      set((state) => ({
        user: state.user
          ? {
              ...state.user,
              files: addFileToParent(state.user.files, newFile, parentId || ''),
            }
          : null,
        loading: false,
      }));

      console.log('File successfully created:', newFile);
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

  uploadFolder: async ({ name, parentId }) => {
    set({ loading: true, error: null });

    try {
      const newFile: FileType = {
        id: generateId(),
        filename: name,
        type: getFileType(name),
        url: '',
        files: [],
        acces: 'only you',
        modified: getCurrentDate(),
      };

      set((state) => ({
        user: state.user
          ? {
              ...state.user,
              files: addFileToParent(state.user.files, newFile, parentId || ''),
            }
          : null,
        loading: false,
      }));

      console.log('Folder successfully created:', newFile);
    } catch (error: unknown) {
      console.error('Error while creating folder:', error);
      set({
        loading: false,
        error:
          error instanceof Error
            ? error.message
            : 'Error while creating folder',
      });
    }
  },
}));
