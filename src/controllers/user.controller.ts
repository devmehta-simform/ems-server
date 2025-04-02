import { RequestHandler } from 'express';
import RequestHandlerWrapper from '../utils/asyncWrapper';
import { SuccessResponse } from '../utils/response';
import prisma from '../utils/prismaProvider';
import createHttpError from 'http-errors';
import jwt, { SignOptions } from 'jsonwebtoken';

export const login: RequestHandler = RequestHandlerWrapper(async function (req, res, next) {
  const userReq = req.body;
  const user = await prisma.user.findUnique({
    where: {
      email: userReq.email,
      password: userReq.password,
      role: userReq.role,
    },
    select: {
      id: true,
      name: true,
      email: true,
      avatar: true,
      role: true,
    },
  });
  if (user === null) throw createHttpError.NotFound('user not found');
  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET!, { expiresIn: parseInt(process.env.EXPIRES_IN!) });
  res.cookie('token', token, {
    httpOnly: true,
    secure: false,
    maxAge: parseInt(process.env.EXPIRES_IN!) * 1000,
    path: '/',
  });
  return res.status(200).json(new SuccessResponse({ user }));
});

export const register: RequestHandler = RequestHandlerWrapper(async function (req, res, next) {
  const user = await prisma.user.create({ data: req.body });
  return res.status(201).json(new SuccessResponse(user));
});
