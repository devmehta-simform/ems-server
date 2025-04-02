import { ErrorRequestHandler } from 'express';
import { HttpError } from 'http-errors';

const errorHandler: ErrorRequestHandler = function (err, req, res, next) {
  if (err instanceof HttpError) {
    res.status(err.statusCode).json({
      error: err,
    });
  } else {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export default errorHandler;
