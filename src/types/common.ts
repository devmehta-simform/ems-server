import { z } from 'zod';
import { RolesSchema } from '../schemas';
import { type Request, type Response, type NextFunction } from 'express';

type AsyncRequestHandler = (_req: Request, _res: Response, _next: NextFunction) => Promise<Response>;

const UserTokenSchema = z.object({ id: z.string(), role: RolesSchema });

type UserToken = z.infer<typeof UserTokenSchema>;

export { AsyncRequestHandler, UserTokenSchema, UserToken };
