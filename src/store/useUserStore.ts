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
    if (!userId) {
      set({ error: 'User ID is not available', loading: false });
      return;
    }

    set({ loading: true, error: null });
    try {
      const user = await getUsers(userId);
      if (user) {
        set({
          user,
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
