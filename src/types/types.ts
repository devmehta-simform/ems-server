import { Request, Response, NextFunction } from 'express';

type AsyncRequestHandler = (req: Request, res: Response, next: NextFunction) => Promise<Response>;

const enum UserRoutes {
  'login' = '/login',
  'register' = '/register',
}

export { AsyncRequestHandler, UserRoutes };
