import express from 'express';
import * as UserService from '../services/user.service';
import { validate } from '../middlewares';
import { UserLoginSchema, UserRegisterSchema } from '../dto';

const userRouter = express.Router();

userRouter.route('/login').post(validate(UserLoginSchema), UserService.login);
userRouter.route('/register').post(validate(UserRegisterSchema), UserService.register);

export { userRouter };
