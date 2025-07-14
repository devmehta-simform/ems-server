import { SuccessResponse } from '../types';
import { prisma, RequestHandlerWrapper } from '../utils';
import createHttpError from 'http-errors';

export const createTicket = RequestHandlerWrapper(async function (req, res, _next) {
  const { qrCode, userId, eventId } = req.body;
  const qty = req.query['qty'] ? parseInt(req.query['qty'].toString()) : 0;
  console.log(qty);
  const result = await prisma.$transaction(async tx => {
    const event = await tx.event.findUnique({
      where: { id: eventId, deletedAt: { isSet: false } },
      select: { numberOfTickets: true, numberOfTicketsSold: true },
    });
    if (!event) throw createHttpError.NotFound('Event not found');
    const sold = event.numberOfTicketsSold ?? 0;
    if (sold >= event.numberOfTickets) {
      throw createHttpError.Conflict('All tickets are sold out');
    }
    if (sold + qty >= event.numberOfTickets) {
      throw createHttpError.Conflict('Cannot purchase more tickets than available');
    }
    await tx.event.update({
      where: { id: eventId, deletedAt: { isSet: false } },
      data: { numberOfTicketsSold: sold + qty },
    });
    // Create the ticket
    const ticket = await tx.purchaseHistory.create({
      data: { qrCode, userId, eventId },
    });
    return ticket;
  });

  return res.status(200).json(new SuccessResponse(result));
});

export const getAllTicketsForUser = RequestHandlerWrapper(async function (req, res, _next) {
  const userId = req.params['userId'];
  const searchQuery = req.query['searchQuery']?.toString() || '';
  const tickets = await prisma.purchaseHistory.findMany({
    where: { userId, deletedAt: { isSet: false }, event: { name: { contains: searchQuery } } },
    include: { event: { omit: { isActive: true, updatedAt: true, deletedAt: true } } },
    omit: { deletedAt: true, updatedAt: true, createdAt: true },
  });
  return res.status(200).json(new SuccessResponse(tickets));
});

export const getTicket = RequestHandlerWrapper(async function (req, res, _next) {
  const ticketId = req.params['ticketId'];
  const userId = req.params['userId'];
  const [ticket] = await prisma.purchaseHistory.findMany({
    where: { ticketId, userId, deletedAt: { isSet: false } },
    include: { event: { omit: { isActive: true, updatedAt: true, deletedAt: true } } },
    omit: { deletedAt: true, updatedAt: true, createdAt: true },
  });
  return res.status(200).json(new SuccessResponse(ticket));
});
