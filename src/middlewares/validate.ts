import { AnyZodObject } from 'zod';
import { RequestHandlerWrapper } from '../utils';
import { type RequestHandler } from 'express';

const validate: (_schema: AnyZodObject) => RequestHandler = function fun(schema: AnyZodObject) {
  return RequestHandlerWrapper(function (req, _res, _next) {
    schema.parse(req.body);
  });
};

export { validate };
