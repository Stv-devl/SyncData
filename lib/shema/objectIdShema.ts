import { ObjectId } from 'mongodb';
import { z } from 'zod';

export const objectIdSchema = z.string().refine((id) => ObjectId.isValid(id), {
  message: 'Invalid MongoDB ObjectId',
});
