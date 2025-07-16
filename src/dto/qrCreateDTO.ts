import { z } from 'zod';
import { ReviewSchema } from '../models';

const EventDetailsSchema = z.object({
  name: z.string(),
  id: z.string(),
  userId: z.string(),
  coverImage: z.string(),
  images: z.array(z.string()),
  description: z.string(),
  ticketPrice: z.number().positive(),
  numberOfTickets: z.number().positive(),
  numberOfTicketsSold: z.number().nullable(),
  address: z.string(),
  zipcode: z.string(),
  city: z.string(),
  state: z.string(),
  country: z.string(),
  dateOfEvent: z.string().datetime(),
  startTime: z.string().datetime(),
  endTime: z.string().datetime(),
  review: ReviewSchema.optional(),
});

export const qrCreateSchema = z.object({
  userId: z.string(),
  userEmail: z.string().email(),
  event: EventDetailsSchema,
  qty: z.number().positive(),
  userName: z.string(),
});
