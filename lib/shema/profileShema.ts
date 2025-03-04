import { z } from 'zod';

/**
 * Schema for the profile form
 */
export const profileSchema = z.object({
  firstname: z.string().min(2, 'Firstname is required').max(50).optional(),
  lastname: z.string().min(2, 'Lastname is required').max(50).optional(),
  email: z.string().email('Invalid email format').max(50).optional(),
  image: z.union([z.string(), z.null()]).optional(),
});
