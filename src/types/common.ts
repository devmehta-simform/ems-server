import { z } from 'zod';
import { Roles } from '../models';
import { type Request, type Response, type NextFunction } from 'express';

type AsyncRequestHandler = (req: Request, res: Response, next: NextFunction) => Promise<Response>;

type UserToken = { id: string; role: z.infer<typeof Roles> };

export { AsyncRequestHandler, UserToken };
