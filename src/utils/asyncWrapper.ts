import { RequestHandler } from 'express';
import createHttpError, { HttpError } from 'http-errors';
import { ZodError } from 'zod';
import { AsyncRequestHandler } from '../types/types';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

function RequestHandlerWrapper(fn: AsyncRequestHandler | RequestHandler): RequestHandler {
  const fun: RequestHandler = async function (req, res, next) {
    try {
      await fn(req, res, next);
      if (!res.headersSent) {
        next();
      }
    } catch (err: unknown) {
      if (err instanceof ZodError) {
        next(
          createHttpError(
            400,
            err.issues.map(i => ({
              field: i.path,
              code: i.code,
            }))
          )
        );
      } else if (err instanceof PrismaClientKnownRequestError) {
        switch (err.code) {
          case 'P2025':
            next(createHttpError(404, { ...err.meta }));
        }
      } else if (err instanceof HttpError) {
        next(createHttpError(err.statusCode, err.message));
      } else if (err instanceof Error) {
        next(createHttpError.InternalServerError(err.message));
      }
    }
  };
  return fun;
}

export default RequestHandlerWrapper;
