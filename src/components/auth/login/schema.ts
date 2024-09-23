import { z } from 'zod';

/**
 * @todo: Use internationalization for error messages.
 */
export const LoginSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(3),
});
