import { ErrorRequestHandler } from 'express';
import { HttpError } from 'http-errors';

const errorHandler: ErrorRequestHandler = function (err, req, res, next) {
  if (err instanceof HttpError) {
    res.status(err.statusCode).json({
      error: {
        message: err.message,
      },
    });
  } else {
    console.error(err);
  }
};

export default errorHandler;
