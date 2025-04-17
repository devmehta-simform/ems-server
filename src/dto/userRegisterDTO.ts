import { UserSchema } from '../schemas';

const UserRegisterSchema = UserSchema.pick({
  email: true,
  name: true,
  password: true,
  role: true,
});

export { UserRegisterSchema };
