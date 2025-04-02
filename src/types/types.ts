import { Request, Response, NextFunction } from 'express';

type AsyncRequestHandler = (req: Request, res: Response, next: NextFunction) => Promise<Response>;

const enum Routes {
  'user' = '/user',
  'event' = '/event',
}

const enum UserRoutes {
  'login' = '/login',
  'register' = '/register',
}

const enum EventRoutes {
  'event' = '/',
}

export { AsyncRequestHandler, Routes, UserRoutes, EventRoutes };
