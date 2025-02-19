import { z } from 'zod';

export const signupSchema = z.object({
  email: z.string().email().max(255),
  password: z.string().min(4).max(100),
});
