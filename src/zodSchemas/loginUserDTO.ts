import { z } from 'zod';

const UserLoginDTO = z.object({
  username: z.string(),
  password: z.string(),
  role: z.enum(['ru', 'em', 'es']),
});

export default UserLoginDTO;
