import { DiscountSchema } from '../schemas';

const DiscountCreateSchema = DiscountSchema.omit({
  id: true,
});

export { DiscountCreateSchema };
