import express from 'express';
import { auth, validate } from '../middlewares';
import * as DiscountService from '../services/discount.service';
import { DiscountCreateSchema, DiscountUpdateStatusSchema } from '../dto';

const discountRouter = express.Router();

discountRouter.route('/').post(auth('Host'), validate(DiscountCreateSchema), DiscountService.createDiscount);

discountRouter
  .route('/:discountId')
  .get(auth(), DiscountService.getDiscount)
  .patch(auth('Host'), validate(DiscountUpdateStatusSchema), DiscountService.updateDiscountStatus);

export { discountRouter };
