import { z } from 'zod';

export const updateSchema = z
  .object({
    fileId: z
      .string({ required_error: 'FileId is required' })
      .min(1, 'FileId cannot be empty'),
    fileName: z
      .string({ required_error: 'FileName is required' })
      .min(1, 'FileName cannot be empty')
      .max(255, 'FileName too long'),
  })
  .strict();
