import { z } from 'zod';

export const deleteShema = z.object({
  parentId: z.string().nullable().optional(),
  fileId: z.array(z.string()).min(1, 'fileId must be a non-empty array'),
  publicId: z.array(z.string()).optional(),
});
