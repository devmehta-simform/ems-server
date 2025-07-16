import { Prisma, PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const userRegisterExtension = Prisma.defineExtension({
  name: 'registerUser',
  query: {
    user: {
      async create({ model: _model, operation: _operation, args, query }) {
        args.data.password = bcrypt.hashSync(args.data.password, bcrypt.genSaltSync(10));
        return query(args);
      },
    },
  },
});

const prisma = new PrismaClient().$extends(userRegisterExtension);

export { prisma };
