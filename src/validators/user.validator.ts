import { RequestHandler } from 'express';
import UserLoginDTO from '../zodSchemas/loginUserDTO';
import { z } from 'zod';
import RequestHandlerWrapper from '../utils/asyncWrapper';
import UserRegisterDTO from '../zodSchemas/registerUserDTO';
import { UserRoutes } from '../types/types';

const validate: RequestHandler = RequestHandlerWrapper(function validate(req, res, next) {
  let result;
  switch (req.url) {
    case UserRoutes.register:
      validateRegister(req.body);
      break;
    case UserRoutes.login:
      validateLogin(req.body);
      break;
  }
  return result;
});

function validateLogin(user: unknown): z.infer<typeof UserLoginDTO> {
  return UserLoginDTO.parse(user);
}

function validateRegister(user: unknown): z.infer<typeof UserRegisterDTO> {
  return UserRegisterDTO.parse(user);
}

export default validate;
