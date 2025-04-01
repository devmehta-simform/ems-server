import { z } from 'zod';

const UserRegisterDTO = z.object({
  name: z.string(),
  password: z.string(),
  role: z.enum(['Guest', 'Host', 'Volunteer']),
  email: z.string(),
});

export default UserRegisterDTO;
