import express from 'express';
import { auth, validate } from '../middlewares';
import * as DiscountService from '../services/discount.service';
import { DiscountCreateSchema, DiscountUpdateStatusSchema } from '../dto';
import { RolesEnum } from '../types';

const discountRouter = express.Router();

discountRouter.route('/').post(auth(RolesEnum['Host']), validate(DiscountCreateSchema), DiscountService.createDiscount);

discountRouter
  .route('/:discountId')
  .get(auth(), DiscountService.getDiscount)
  .patch(auth(RolesEnum['Host']), validate(DiscountUpdateStatusSchema), DiscountService.updateDiscountStatus);

export { discountRouter };
