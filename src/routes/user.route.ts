import express from 'express';
import { login } from '../controllers/user.controller';
import validate from '../validators/user.validator';
import { register } from '../controllers/user.controller';
import { UserRoutes } from '../types/types';
import passport from '../utils/passport';
import RequestHandlerWrapper from '../utils/asyncWrapper';

const router = express.Router();

router.route(UserRoutes.login).post(validate, passport.authenticate('custom', { session: false }), login);
router.route(UserRoutes.register).post(validate, register);

export default router;
