import { RequestHandler } from 'express';
import RequestHandlerWrapper from '../utils/asyncWrapper';
import { SuccessResponse } from '../utils/response';
import prisma from '../utils/prismaProvider';
import createHttpError from 'http-errors';

export const login: RequestHandler = RequestHandlerWrapper(async function (req, res, next) {
  const userReq = req.body;
  const user = await prisma.user.findUnique({
    where: {
      email: userReq.email,
      password: userReq.password,
      role: userReq.role,
    },
  });
  if (user === null) throw createHttpError.NotFound('user not found');
  return res.status(200).json(new SuccessResponse(user));
});

export const register: RequestHandler = RequestHandlerWrapper(async function (req, res, next) {
  const user = await prisma.user.create({ data: req.body });
  return res.status(201).json(new SuccessResponse(user));
});
