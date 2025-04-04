import { AnyZodObject } from 'zod';
import { RequestHandlerWrapper } from '../utils';
import { type RequestHandler } from 'express';

const validate: (schema: AnyZodObject) => RequestHandler = function fun(schema: AnyZodObject) {
  return RequestHandlerWrapper(function (req, res, next) {
    schema.parse(req.body);
  });
};

export { validate };
