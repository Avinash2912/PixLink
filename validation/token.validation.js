import {z} from 'zod';

export const authTokenSchema = z.object({
  id: z.string(),
});
