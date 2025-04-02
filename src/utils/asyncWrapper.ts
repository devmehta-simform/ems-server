import { RequestHandler } from 'express';
import createHttpError, { HttpError } from 'http-errors';
import { ZodError } from 'zod';
import { AsyncRequestHandler } from '../types/types';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JsonWebTokenError } from 'jsonwebtoken';

function RequestHandlerWrapper(fn: AsyncRequestHandler | RequestHandler): RequestHandler {
  const fun: RequestHandler = async function (req, res, next) {
    try {
      await fn(req, res, next);
      if (!res.headersSent) {
        return next();
      }
    } catch (err: unknown) {
      if (err instanceof JsonWebTokenError) {
        return next(createHttpError.BadRequest(err.message));
      } else if (err instanceof ZodError) {
        return next(createHttpError(400, err.errors[0].message));
      } else if (err instanceof PrismaClientKnownRequestError) {
        switch (err.code) {
          case 'P2002':
            next(createHttpError.Conflict(`${err.meta?.modelName} already exists`));
            break;
          default:
            next(createHttpError.InternalServerError(`Something went wrong: ${err.message}`));
        }
      } else if (err instanceof HttpError) {
        return next(createHttpError(err.statusCode, err.message));
      } else if (err instanceof Error) {
        return next(createHttpError.InternalServerError(err.message));
      } else {
        console.error(err);
      }
    }
  };
  return fun;
}

export default RequestHandlerWrapper;
