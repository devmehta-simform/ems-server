import { RequestHandler } from 'express';
import { SuccessResponse } from '../types';
import { RequestHandlerWrapper, prisma } from '../utils';
export const getEvents: RequestHandler = RequestHandlerWrapper(async function (req, res, next) {
  const events = await prisma.event.findMany();
  return res.status(200).json(new SuccessResponse(events));
});
