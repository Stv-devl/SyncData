import { ObjectId } from 'mongodb';
import { z } from 'zod';

/**
 * Schema for validating MongoDB ObjectId
 * @typedef {Object} ObjectIdSchema
 * @property {string} id - The ID to validate
 * @property {string} message - The error message if validation fails
 */

export const objectIdSchema = z.string().refine((id) => ObjectId.isValid(id), {
  message: 'Invalid MongoDB ObjectId',
});
