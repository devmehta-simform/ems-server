import express from 'express';
import * as UserService from '../services/user.service';
import { UserRoutes } from '../types';
import { validate } from '../middlewares';
import { UserLoginSchema, UserRegisterSchema } from '../dto';

const userRouter = express.Router();

userRouter.route(UserRoutes.login).post(validate(UserLoginSchema), UserService.login);
userRouter.route(UserRoutes.register).post(validate(UserRegisterSchema), UserService.register);

export { userRouter };
