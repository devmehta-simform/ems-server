import express from 'express';
import userRouter from './routes/user.route';
import eventRouter from './routes/event.route';
import dotenv from 'dotenv';
import errorHandler from './utils/errorHandler';
import morgan from 'morgan';
import { Routes } from './types/types';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(morgan('tiny'));
app.use(Routes.user, userRouter);
app.use(Routes.event, eventRouter);
app.use(errorHandler);

app.listen(process.env.PORT || 5000, () => {
  console.log('server is up and running...');
});
