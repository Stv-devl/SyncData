import { ObjectId } from 'mongodb';
import { z } from 'zod';

/**
 * Schéma pour créer un fichier
 * @typedef {Object} PostSchema
 * @property {string} userId - ID de l'utilisateur
 * @property {Object} newFile - Nouveau fichier à créer
 */

export const postSchema = z.object({
  userId: z.string().min(1, 'User ID is required'),
  newFile: z.object({
    id: z
      .string()
      .optional()
      .default(() => new ObjectId().toString()),
    filename: z.string().min(1, 'File name is required'),
    type: z.enum([
      'file',
      'folder',
      'doc',
      'pdf',
      'image',
      'dwg',
      'zip',
      'spreadsheet',
      'presentation',
      'video',
      'audio',
    ]),
    url: z.string().optional(),
    publicId: z.string().optional(),
    file: z.any().optional(),
    files: z.array(z.any()).optional().default([]),
    isFavorite: z.boolean().optional(),
    acces: z.string(),
    modified: z.string(),
  }),
  parentId: z.string().optional().nullable(),
});
