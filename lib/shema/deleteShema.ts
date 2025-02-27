import { z } from 'zod';

/**
 * Schema for validating delete operations
 * @typedef {Object} DeleteShema
 * @property {string | null} parentId - The parent ID of the file to delete
 * @property {string[]} fileId - The IDs of the files to delete
 * @property {string[]} publicId - The public IDs of the files to delete
 */

export const deleteShema = z.object({
  parentId: z.string().nullable().optional(),
  fileId: z.array(z.string()).min(1, 'fileId must be a non-empty array'),
  publicId: z.array(z.string()).optional(),
});
