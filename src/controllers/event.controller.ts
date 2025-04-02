import { RequestHandler } from 'express';
import RequestHandlerWrapper from '../utils/asyncWrapper';
import { SuccessResponse } from '../utils/response';
import prisma from '../utils/prismaProvider';

export const getEvents: RequestHandler = RequestHandlerWrapper(async function (req, res, next) {
  const events = await prisma.event.findMany();
  return res.status(200).json(new SuccessResponse(events));
});
