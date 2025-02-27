import { z } from 'zod';

/**
 * Schema for validating favorite operations
 * @typedef {Object} FavoriteSchema
 * @property {string} fileId - The ID of the file to update
 * @property {string} actionType - The type of action to perform
 */

export const favoriteSchema = z.object({
  fileId: z.string().min(1, 'fileId is required'),
  actionType: z.literal('updateFavorite'),
});
