import express from 'express';
import { login } from '../controllers/user.controller';
import validate from '../validators/user.validator';

const router = express.Router();

router.route('/login').post(validate, login);

export default router;
