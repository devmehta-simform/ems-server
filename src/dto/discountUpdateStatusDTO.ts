import { DiscountSchema } from '../schemas';

const DiscountUpdateStatusSchema = DiscountSchema.pick({
  status: true,
});

export { DiscountUpdateStatusSchema };
