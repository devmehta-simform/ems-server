import { SuccessResponse } from '../types';
import { prisma, RequestHandlerWrapper } from '../utils';

export const createTicket = RequestHandlerWrapper(async function (req, res, _next) {
  const t = await prisma.purchaseHistory.create({
    data: {
      qrCode: req.body.qrCode,
      userId: req.body.userId,
      eventId: req.body.eventId,
    },
  });
  console.log(t);
  return res.status(200).json(new SuccessResponse(t));
});

export const getAllTicketsForUser = RequestHandlerWrapper(async function (req, res, _next) {
  const userId = req.params['userId'];
  const tickets = await prisma.purchaseHistory.findMany({
    where: { userId, deletedAt: { isSet: false } },
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
