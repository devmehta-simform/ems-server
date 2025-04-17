import { z } from 'zod';
import { DiscountStatus } from '@prisma/client';

const DiscountStatusSchema = z.nativeEnum(DiscountStatus);

const DiscountSchema = z.object({
  id: z.string(),
  eventId: z.string(),
  startsAt: z.string().datetime(),
  endsAt: z.string().datetime(),
  status: DiscountStatusSchema,
  discountAmount: z.number(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  deletedAt: z.string().datetime().nullable(),
});

export { DiscountSchema, DiscountStatusSchema };
