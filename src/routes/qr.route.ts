import express from 'express';
import { auth, validate } from '../middlewares';
import { qrCreateSchema } from '../dto';
import * as QrService from '../services/qr.service';

export const qrRouter = express.Router();

qrRouter.route('/').post(auth(), validate(qrCreateSchema), QrService.createQr);
