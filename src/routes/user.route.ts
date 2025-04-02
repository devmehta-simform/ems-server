import express from 'express';
import { login } from '../controllers/user.controller';
import validate from '../validators/user.validator';
import { register } from '../controllers/user.controller';
import { UserRoutes } from '../types/types';

const router = express.Router();

router.route(UserRoutes.login).post(validate, login);
router.route(UserRoutes.register).post(validate, register);

export default router;
