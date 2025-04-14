import { type RequestHandler } from 'express';
import { RequestHandlerWrapper } from '../utils';
import { UserTokenSchema } from '../types';
import jwt from 'jsonwebtoken';
import createHttpError from 'http-errors';
import { z } from 'zod';
import { Roles } from '../models';

const auth = function (role: z.infer<typeof Roles> | 'All' = 'All') {
  return RequestHandlerWrapper(async function (req, res, next) {
    const authCookie = req.cookies['token'];
    if (authCookie) {
      const token = jwt.verify(authCookie, process.env.JWT_SECRET!);
      const isUserToken = UserTokenSchema.safeParse(token);
      if (!isUserToken.success) throw createHttpError.BadRequest('unauthenticated user');
      req.user = isUserToken.data;
      if (role !== 'All' && req.user.role !== role) throw createHttpError.Forbidden();
    } else throw createHttpError.BadRequest('unauthenticated user');
  });
};

export { auth };
