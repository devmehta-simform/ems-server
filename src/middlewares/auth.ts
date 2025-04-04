import { type RequestHandler } from 'express';
import { RequestHandlerWrapper } from '../utils';
import { type UserToken } from '../types';
import jwt from 'jsonwebtoken';
import createHttpError from 'http-errors';

const auth: RequestHandler = RequestHandlerWrapper(async function (req, res, next) {
  const authCookie = req.cookies['token'];
  if (authCookie) {
    const token = jwt.verify(authCookie, process.env.JWT_SECRET!);
    req.user = token as UserToken;
  } else throw createHttpError.BadRequest('no token provied');
});

export { auth };
