import express from 'express';
import router from './routes/user.route';
import dotenv from 'dotenv';
import errorHandler from './utils/errorHandler';

dotenv.config();

const app = express();

app.use(express.json());
app.use('/user', router);
app.use(errorHandler);

app.listen(process.env.PORT || 5000, () => {
  console.log('server is up and running...');
});
