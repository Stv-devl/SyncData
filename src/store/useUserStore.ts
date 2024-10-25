import { create } from 'zustand';
import { useFileStore } from './useFileStore';
import getUsers from '@/service/getUsers';
import { UserState } from '@/types/storeType';

export const useUserStore = create<UserState>((set) => ({
  user: null,
  profile: null,
  loading: false,
  error: null,

  setUser: (user) => set({ user }),

  fetchData: async (userId: string): Promise<void> => {
    set({ loading: true, error: null });
    try {
      const response = await getUsers();
      const user = response.users.find((u) => u._id === userId) || null;

      if (user) {
        set({
          user: user,
          profile: user.profile,
          loading: false,
        });

        const { setFiles } = useFileStore.getState();
        setFiles(user.files);
      } else {
        set({ user: null, loading: false });
      }
    } catch (error) {
      const errorMsg =
        error instanceof Error ? error.message : 'An unknown error occurred';
      set({ error: errorMsg, loading: false });
    }
  },
}));
