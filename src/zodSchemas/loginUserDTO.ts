import { z } from 'zod';

const UserLoginDTO = z.object({
  email: z.string(),
  password: z.string(),
  role: z.enum(['Guest', 'Host', 'Volunteer']),
});

export default UserLoginDTO;
