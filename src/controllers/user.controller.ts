import { RequestHandler } from 'express';
import RequestHandlerWrapper from '../utils/asyncWrapper';
import { SuccessResponse } from '../utils/response';

export const login: RequestHandler = RequestHandlerWrapper(async function (req, res, next) {
  return res.status(200).json(new SuccessResponse(req.body));
});
