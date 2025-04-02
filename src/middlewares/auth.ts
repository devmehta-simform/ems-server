import { RequestHandler } from 'express';
import RequestHandlerWrapper from '../utils/asyncWrapper';
import jwt from 'jsonwebtoken';
import createHttpError from 'http-errors';

const auth: RequestHandler = RequestHandlerWrapper(async function (req, res, next) {
  const authCookie = req.cookies['token'];
  console.log(process.env.EXPIRES_IN);
  if (authCookie) {
    jwt.verify(authCookie, process.env.JWT_SECRET!);
  } else throw createHttpError.BadRequest('no token provied');
});

export default auth;
