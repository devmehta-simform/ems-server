import { type RequestHandler } from 'express';
import { SuccessResponse } from '../types';
import { RequestHandlerWrapper, prisma } from '../utils';

export const getEvents: RequestHandler = RequestHandlerWrapper(async function (req, res, next) {
  const events = await prisma.event.findMany();
  return res.status(200).json(new SuccessResponse(events));
});

export const addEvent: RequestHandler = RequestHandlerWrapper(async function (req, res, next) {
  const eventReq = req.body;
  const user = req.user;
  const event = await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      events: {
        createMany: {
          data: [eventReq],
        },
      },
    },
    select: {
      events: true,
    },
  });

  return res.status(201).json(new SuccessResponse(event));
});

export const deleteEvent: RequestHandler = RequestHandlerWrapper(async function (req, res, next) {
  const { id } = req.params;

  const event = await prisma.event.update({
    where: { id, deletedAt: { isSet: false }, userId: req.user.id },
    data: {
      deletedAt: new Date(),
    },
  });

  return res.status(200).json(new SuccessResponse('deleted succesfully'));
});

export const getEvent: RequestHandler = RequestHandlerWrapper(async function (req, res, next) {
  const { id } = req.params;

  const event = await prisma.event.findUniqueOrThrow({
    where: { id, deletedAt: { isSet: false }, userId: req.user.id },
  });

  return res.status(200).json(new SuccessResponse(event));
});

export const updateEvent: RequestHandler = RequestHandlerWrapper(async function (req, res, next) {
  const { id } = req.params;
  const eventReq = req.body;
  const event = await prisma.event.update({
    where: { id, deletedAt: { isSet: false }, userId: req.user.id },
    data: { ...eventReq, updatedAt: new Date() },
  });

  return res.status(200).json(new SuccessResponse(event));
});
