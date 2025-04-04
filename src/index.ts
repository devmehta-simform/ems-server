import express from 'express';
import { userRouter, eventRouter } from './routes';
import dotenv from 'dotenv';
import { errorHandler } from './utils/';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import './utils/zodCustomError';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(morgan('tiny'));
app.use('/user', userRouter);
app.use('/event', eventRouter);
app.use(errorHandler);

app.listen(process.env.PORT || 5000, () => {
  console.log('server is up and running...');
});
