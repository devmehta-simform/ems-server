import { z } from 'zod';
import { Discount } from './discount.model';
import { Review } from './review.model';
import { PurchaseHistory } from './purchaseHistory.model';

const Event = z.object({
  name: z.string(),
  id: z.string(),
  userId: z.string(),
  images: z.array(z.string()),
  description: z.string(),
  ticketPrice: z.number(),
  numberOfTickets: z.number(),
  numberOfTicketsSold: z.number().nullable(),
  venue: z.string(),
  dateOfEvent: z.string().datetime(),
  discount: Discount.optional(),
  review: Review.optional(),
  purchaseHistory: PurchaseHistory.optional(),
});

export { Event };
