import { DiscountSchema } from '../models';

const DiscountCreateSchema = DiscountSchema.omit({
  id: true,
  deletedAt: true,
  updatedAt: true,
  createdAt: true,
});

export { DiscountCreateSchema };
