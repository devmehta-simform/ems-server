import { type RequestHandler } from 'express';
import { CustomError, SuccessResponse } from '../types';
import { RequestHandlerWrapper, getEnvVars, prisma } from '../utils';
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

  if (user === null) throw createHttpError.NotFound(CustomError.INVALID_CREDENTIALS);

  const match = bcrypt.compareSync(userReq.password, user.password);

  if (!match) throw createHttpError.BadRequest(CustomError.INVALID_CREDENTIALS);

  const defaultSecret = 'defaultSecret';
  const defaultExpiresIn = '172800';

  const expiresIn = getEnvVars('EXPIRES_IN') || defaultExpiresIn;
  const jwtSecret = getEnvVars('JWT_SECRET') || defaultSecret;
  const token = jwt.sign({ id: user.id, role: user.role }, jwtSecret, {
    expiresIn: parseInt(expiresIn),
  });

  res.cookie('token', token, {
    httpOnly: true,
    secure: false,
    maxAge: parseInt(expiresIn) * 1000,
    path: '/',
  });

  return res.status(200).json(new SuccessResponse({ user }));
});

export const register: RequestHandler = RequestHandlerWrapper(async function (req, res, _next) {
  const user = await prisma.user.create({ data: req.body });
  return res.status(201).json(new SuccessResponse(user));
});
