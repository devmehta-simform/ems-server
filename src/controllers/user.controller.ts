import { RequestHandler } from 'express';
import RequestHandlerWrapper from '../utils/asyncWrapper';
import { SuccessResponse } from '../utils/response';
import prisma from '../utils/prismaProvider';

export const login: RequestHandler = RequestHandlerWrapper(async function (req, res, next) {
  if (req.user) return res.status(200).json(new SuccessResponse(req.body));
});

export const register: RequestHandler = RequestHandlerWrapper(async function (req, res, next) {
  const user = await prisma.user.create({ data: req.body });
  console.log(user);
  return res.status(201).json(new SuccessResponse(user));
});
