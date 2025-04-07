import { type RequestHandler } from 'express';
import { RequestHandlerWrapper } from '../utils';
import { type UserToken } from '../types';
import jwt from 'jsonwebtoken';
import createHttpError from 'http-errors';
import { z } from 'zod';
import { Roles } from '../models';

const auth = function (role: z.infer<typeof Roles> | 'All' = 'All') {
  return RequestHandlerWrapper(async function (req, res, next) {
    const authCookie = req.cookies['token'];
    if (authCookie) {
      const token = jwt.verify(authCookie, process.env.JWT_SECRET!);
      req.user = token as UserToken;
      if (role !== 'All' && req.user.role !== role) throw createHttpError.Forbidden();
    } else throw createHttpError.BadRequest('no token provided');
  });
};

export { auth };
