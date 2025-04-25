import { z } from 'zod';
import { BookingStatus } from '@prisma/client';

const BookingStatusSchema = z.nativeEnum(BookingStatus);

const PurchaseHistorySchema = z.object({
  ticketId: z.string(),
  status: BookingStatusSchema,
  userId: z.string(),
  eventId: z.string(),
  bookingDate: z.string().datetime(),
  qrCode: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  deletedAt: z.string().datetime().nullable(),
});

export { PurchaseHistorySchema, BookingStatusSchema };
