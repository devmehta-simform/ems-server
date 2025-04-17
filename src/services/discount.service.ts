import { RequestHandler } from 'express';
import { prisma, RequestHandlerWrapper } from '../utils';
import { SuccessResponse } from '../types';

export const createDiscount: RequestHandler = RequestHandlerWrapper(async function (req, res, _next) {
  const event = await prisma.event.update({
    where: {
      userId: req.user.id,
      id: req.body.eventId,
    },
    data: {
      discount: {
        create: {
          discountAmount: req.body.discountAmount,
          endsAt: req.body.endsAt,
          startsAt: req.body.startsAt,
          status: req.body.status,
        },
      },
    },
    include: { discount: true },
  });
  return res.status(201).json(new SuccessResponse(event));
});

export const getDiscount: RequestHandler = RequestHandlerWrapper(async function (req, res, _next) {
  const discount = await prisma.discount.findUniqueOrThrow({
    where: {
      id: req.params.discountId,
    },
  });
  return res.status(200).json(new SuccessResponse(discount));
});

export const updateDiscountStatus: RequestHandler = RequestHandlerWrapper(async function (req, res, _next) {
  const discount = await prisma.discount.update({
    where: {
      id: req.params.discountId,
    },
    data: {
      status: req.body.status,
    },
  });
  return res.status(200).json(new SuccessResponse(discount));
});
