import passportCustom from 'passport-custom';
import passport from 'passport';
import prisma from './prismaProvider';
import createHttpError from 'http-errors';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

const CustomStrategy = passportCustom.Strategy;

passport.use(
  'custom',
  new CustomStrategy(async function (req, done) {
    const user = req.body;
    try {
      await prisma.user.findFirstOrThrow({
        where: { email: user.email, password: user.password, role: user.role },
      });
      return done(null, user);
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) return done(createHttpError(404, { ...err.meta }), null);
    }
  })
);

export default passport;
