import { z } from 'zod';
import { DiscountSchema } from './discount.model';
import { ReviewSchema } from './review.model';
import { PurchaseHistorySchema } from './purchaseHistory.model';

const EventSchema = z.object({
  name: z.string(),
  id: z.string(),
  userId: z.string(),
  images: z.array(z.string()),
  description: z.string(),
  ticketPrice: z.number().positive(),
  numberOfTickets: z.number().positive(),
  numberOfTicketsSold: z.number().nullable(),
  venue: z.string(),
  dateOfEvent: z.string().datetime(),
  discount: DiscountSchema.optional(),
  review: ReviewSchema.optional(),
  purchaseHistory: PurchaseHistorySchema.optional(),
  isActive: z.boolean(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  deletedAt: z.string().datetime().nullable(),
});

export { EventSchema };
