import { z } from 'zod';
import UserRegisterDTO from './registerUserDTO';

const UserLoginDTO = UserRegisterDTO.pick({
  email: true,
  password: true,
  role: true,
});

export default UserLoginDTO;
