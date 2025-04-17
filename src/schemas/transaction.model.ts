import { z } from 'zod';
import { TransactionStatus } from '@prisma/client';

const TransactionStatusSchema = z.nativeEnum(TransactionStatus);

const TransactionSchema = z.object({
  id: z.string(),
  ticketId: z.string(),
  dateOfTransaction: z.string().datetime(),
  amount: z.number().positive(),
  status: TransactionStatusSchema,
  paymentMethod: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  deletedAt: z.string().datetime().nullable(),
});

export { TransactionSchema, TransactionStatusSchema };
