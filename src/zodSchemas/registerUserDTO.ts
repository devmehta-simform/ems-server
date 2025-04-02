import { z } from 'zod';

const UserRegisterDTO = z.object({
  name: z.string({ message: 'name required' }),
  password: z.string({ message: 'password required' }),
  role: z.enum(['Guest', 'Host', 'Volunteer'], { message: "value should be from ['Guest', 'Host', 'Volunteer']" }),
  email: z.string({ message: 'email required' }),
});

export default UserRegisterDTO;
