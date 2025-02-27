import { create } from 'zustand';
import { useFileStore } from './useFileStore';
import getUsers from '@/service/getUsers';
import { UserState } from '@/types/storeType';

/**
 * User store for managing user data and actions.
 * @typedef {Object} UserState
 * @property {User | null} user - The current user object
 * @property {Profile | null} profile - The user's profile information
 * @property {boolean} loading - Whether the user data is being loaded
 * @property {string | null} error - Error message if any
 */

export const useUserStore = create<UserState>((set, get) => ({
  user: null,
  profile: null,
  loading: false,
  error: null,

  /**
   * Sets the user object in the store.
   * @param {User} user - The user object to set.
   */
  setUser: (user) => set({ user }),

  /**
   * Gets the user ID from the user object.
   * @returns {string | null} The user ID.
   */
  getUserId: () => {
    const userId = get().user?._id;
    if (!userId) {
      set({ error: 'User not logged in', loading: false });
    }
    return userId;
  },

  /**
   * Fetches user data from the server.
   * @param {string} userId - The user ID to fetch data for.
   * @returns {Promise<void>}
   */
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
