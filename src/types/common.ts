import { z } from 'zod';
import { Roles } from '../models';
import { type Request, type Response, type NextFunction } from 'express';

type AsyncRequestHandler = (_req: Request, _res: Response, _next: NextFunction) => Promise<Response>;

const UserTokenSchema = z.object({ id: z.string(), role: Roles });

type UserToken = z.infer<typeof UserTokenSchema>;

export { AsyncRequestHandler, UserTokenSchema, UserToken };
