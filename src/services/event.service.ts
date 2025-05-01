import { type RequestHandler } from 'express';
import { SuccessResponse } from '../types';
import { RequestHandlerWrapper, prisma } from '../utils';

export const getEvents: RequestHandler = RequestHandlerWrapper(async function (_req, res, _next) {
  const events = await prisma.event.findMany({
    where: { deletedAt: { isSet: false } },
    select: {
      name: true,
      address: true,
      city: true,
      state: true,
      country: true,
      zipcode: true,
      coverImage: true,
      dateOfEvent: true,
      images: true,
      ticketPrice: true,
      createdAt: true,
      reviews: true,
      id: true,
    },
    // include: { discount: true },
  });
  return res.status(200).json(new SuccessResponse(events));
});

export const createEvent: RequestHandler = RequestHandlerWrapper(async function (req, res, _next) {
  const eventReq = req.body;
  const user = req.user;

  const event = await prisma.event.create({
    data: { ...eventReq, userId: user.id, isActive: true },
    omit: {
      createdAt: true,
      updatedAt: true,
      deletedAt: true,
      isActive: true,
    },
  });

  return res.status(201).json(new SuccessResponse(event));
});

export const deleteEvent: RequestHandler = RequestHandlerWrapper(async function (req, res, _next) {
  const { eventId } = req.params;

  await prisma.event.update({
    where: { id: eventId, deletedAt: { isSet: false }, userId: req.user.id },
    data: {
      deletedAt: new Date(),
    },
  });

  return res.status(204).json();
});

export const getEvent: RequestHandler = RequestHandlerWrapper(async function (req, res, _next) {
  const { eventId } = req.params;

  const event = await prisma.event.findUniqueOrThrow({
    where: { id: eventId, deletedAt: { isSet: false } },
    omit: {
      isActive: true,
      createdAt: true,
      updatedAt: true,
      deletedAt: true,
    },
    // include: { discount: true },
  });

  return res.status(200).json(new SuccessResponse(event));
});

export const updateEvent: RequestHandler = RequestHandlerWrapper(async function (req, res, _next) {
  const { eventId } = req.params;
  const eventReq = req.body;
  await prisma.event.update({
    where: { id: eventId, deletedAt: { isSet: false }, userId: req.user.id },
    data: { ...eventReq, updatedAt: new Date() },
  });

  return res.status(204).json();
});
