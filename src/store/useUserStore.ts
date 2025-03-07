import { create } from 'zustand';
import patchProfile from '../service/patchProfile';
import useModalStore from './ui/useModale';
import { useFileStore } from './useFileStore';
import getUsers from '@/service/getUsers';
import getValidateStripePayment from '@/service/getValidateStripePayement';
import postCancel from '@/service/postCancel';
import postStripeSession from '@/service/postStripeSession';
import { UserState } from '@/types/storeType';
import { UserProfile } from '@/types/type';

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
  subscription: 'basic',
  subscriptionId: undefined,
  loading: false,
  error: null,

  /**
   * Gets the user ID from the user object.
   * @returns {string | null} The user ID.
   */
  getUserId: () => {
    const userId = get().user?._id;
    if (!userId) {
      set({ error: 'User not logged in', loading: false });
    }
    return userId?.toString();
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
        setFiles(user.files || []);
      } else {
        set({ user: null, loading: false });
      }
    } catch (error) {
      const errorMsg =
        error instanceof Error ? error.message : 'An unknown error occurred';
      set({ error: errorMsg, loading: false });
    }
  },

  updateProfile: async (updatedProfile: UserProfile): Promise<void> => {
    const userId = get().getUserId();
    if (!userId) return;

    console.log('updatedProfile', updatedProfile);

    try {
      const response = await patchProfile(userId, updatedProfile);
      const updatedProfileData = response.updatedData;

      if (!updatedProfileData) {
        throw new Error('Profile is not valid.');
      }
      set((state) => ({
        profile: { ...state.profile, ...updatedProfileData },
      }));

      if (!updatedProfileData.subscription) {
        useModalStore.getState().openModal('UpdateProfile');
      }
    } catch (error) {
      console.error('Error updating the profile:', error);
      set({ error: 'Error updating the profile' });
    }
  },

  /**
   * Updates the user's subscription status.
   * @param {string} plan - The plan to update to.
   * @returns {Promise<void>}
   */
  updateSubscription: async (plan: string) => {
    const userId = get().user?._id;
    if (!userId) {
      set({ error: 'User not logged in' });
      return;
    }

    try {
      const stripeUrl = await postStripeSession(plan, userId.toString());
      window.location.href = stripeUrl;
    } catch (error) {
      set({ error: 'Error updating the subscription' });
      useModalStore.getState().openModal('PayementResult');
    }
  },

  /**
   * Validates the subscription payment and updates the user's subscription status.
   * @param {string} sessionId - The ID of the Stripe session.
   * @returns {Promise<void>}
   */
  validateSubscription: async (sessionId: string) => {
    if (!sessionId) return;

    const userId = get().user?._id;
    if (!userId) {
      set({ error: 'User not logged in' });
      return;
    }

    const currentSubscription = get().subscription;
    if (currentSubscription !== 'basic') return;

    set({ loading: true });
    try {
      const { planName, subscriptionId } = await getValidateStripePayment(
        sessionId
      );
      if (!planName || !subscriptionId) {
        set({
          error: 'Invalid subscription data received from Stripe',
          loading: false,
        });
        return;
      }

      set({
        subscription: planName,
        subscriptionId: subscriptionId,
        error: null,
        loading: false,
      });
      useModalStore.getState().openModal('PayementResult');

      await get().updateProfile({
        subscription: planName,
        subscriptionId,
      });
    } catch (error) {
      set({ error: 'Payment validation failed', loading: false });
      useModalStore.getState().openModal('PayementResult');
    }
  },

  cancelSubscription: async () => {
    const userId = get().user?._id;
    if (!userId) {
      set({ error: 'User not logged in' });
      return;
    }

    const subscriptionId = get().profile?.subscriptionId;
    if (!subscriptionId) {
      set({ error: 'No active subscription found' });
      return;
    }
    try {
      await postCancel(subscriptionId);
      set({
        subscription: 'basic',
        subscriptionId: undefined,
        error: null,
      });

      await get().updateProfile({
        subscription: 'basic',
        subscriptionId: undefined,
      });
      useModalStore.getState().openModal('Canceled');
    } catch (error) {
      set({ error: 'Error canceling the subscription' });
    }
  },
}));
