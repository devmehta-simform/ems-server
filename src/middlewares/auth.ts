import { getEnvVars, RequestHandlerWrapper } from '../utils';
import { CustomError, UserTokenSchema } from '../types';
import jwt from 'jsonwebtoken';
import createHttpError from 'http-errors';
import { z } from 'zod';
import { RolesSchema } from '../models';

const defaultSecret = 'defaultSecret';

const auth = function (role: z.infer<typeof RolesSchema> | 'All' = 'All') {
  return RequestHandlerWrapper(async function (req, _res, _next) {
    const authCookie = req.cookies['token'];
    if (authCookie) {
      const token = jwt.verify(authCookie, getEnvVars('JWT_SECRET') || defaultSecret);
      const isUserToken = UserTokenSchema.safeParse(token);
      if (!isUserToken.success) throw createHttpError.Unauthorized(CustomError.UNAUTHENTICATED_USER);
      req.user = isUserToken.data;
      if (role !== 'All' && req.user.role !== role) throw createHttpError.Forbidden();
    } else throw createHttpError.Unauthorized(CustomError.UNAUTHENTICATED_USER);
  });
};

export { auth };
