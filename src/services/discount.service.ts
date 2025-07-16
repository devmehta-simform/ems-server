import { RequestHandler } from 'express';
import { prisma, RequestHandlerWrapper } from '../utils';
import { SuccessResponse } from '../types';

export const createDiscount: RequestHandler = RequestHandlerWrapper(async function (req, res, _next) {
  const discount = await prisma.discount.create({
    data: {
      discountAmount: req.body.discountAmount,
      endsAt: req.body.endsAt,
      startsAt: req.body.startsAt,
      status: req.body.status,
      eventId: req.body.eventId,
    },
    omit: {
      createdAt: true,
      updatedAt: true,
      deletedAt: true,
    },
  });
  return res.status(201).json(new SuccessResponse(discount));
});

export const getDiscount: RequestHandler = RequestHandlerWrapper(async function (req, res, _next) {
  const discount = await prisma.discount.findUniqueOrThrow({
    where: {
      id: req.params.discountId,
      status: { notIn: ['InActive'] },
      deletedAt: { isSet: false },
    },
    omit: {
      createdAt: true,
      updatedAt: true,
      deletedAt: true,
    },
  });
  return res.status(200).json(new SuccessResponse(discount));
});

export const updateDiscountStatus: RequestHandler = RequestHandlerWrapper(async function (req, res, _next) {
  await prisma.discount.update({
    where: {
      id: req.params.discountId,
      status: { notIn: ['InActive'] },
      deletedAt: { isSet: false },
    },
    data: {
      status: req.body.status,
    },
  });
  return res.status(204).json();
});
