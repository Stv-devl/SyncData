import { z } from 'zod';

/**
 * Schema for validating signup operations
 * @typedef {Object} SignupSchema
 * @property {string} email - The email of the user
 * @property {string} password - The password of the user
 */

export const signupSchema = z.object({
  email: z.string().email().max(255),
  password: z.string().min(4).max(100),
});
