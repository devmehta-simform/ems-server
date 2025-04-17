import { type RequestHandler } from 'express';
import { SuccessResponse } from '../types';
import { RequestHandlerWrapper, prisma } from '../utils';
import createHttpError from 'http-errors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const login: RequestHandler = RequestHandlerWrapper(async function (req, res, _next) {
  const userReq = req.body;

  const user = await prisma.user.findUnique({
    where: {
      email: userReq.email,
      role: userReq.role,
    },
    select: {
      id: true,
      name: true,
      email: true,
      avatar: true,
      role: true,
      password: true,
    },
  });

  if (user === null) throw createHttpError.NotFound('invalid credentials');

  const match = bcrypt.compareSync(userReq.password, user.password);

  if (!match) throw createHttpError.BadRequest('invalid credentials');

  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET!, { expiresIn: parseInt(process.env.EXPIRES_IN!) });

  res.cookie('token', token, {
    httpOnly: true,
    secure: false,
    maxAge: parseInt(process.env.EXPIRES_IN!) * 1000,
    path: '/',
  });

  return res.status(200).json(new SuccessResponse({ user }));
});

export const register: RequestHandler = RequestHandlerWrapper(async function (req, res, _next) {
  const user = await prisma.user.create({ data: req.body });
  return res.status(201).json(new SuccessResponse(user));
});
