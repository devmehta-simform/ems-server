import { RequestHandler } from 'express';
import UserLoginDTO from '../zodSchemas/loginUserDTO';
import { z } from 'zod';
import RequestHandlerWrapper from '../utils/asyncWrapper';

const validate: RequestHandler = RequestHandlerWrapper(function validate(req, res, next) {
  let result;
  switch (req.url) {
    case '/login':
      validateLogin(req.body);
      break;
  }
  return result;
});

function validateLogin(user: unknown): z.infer<typeof UserLoginDTO> {
  const result = UserLoginDTO.parse(user);
  return result;
}
export default validate;
