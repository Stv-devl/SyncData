import { z } from 'zod';

export const favoriteSchema = z.object({
  fileId: z.string().min(1, 'fileId is required'),
  actionType: z.literal('updateFavorite'),
});
