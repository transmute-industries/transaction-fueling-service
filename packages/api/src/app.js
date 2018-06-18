import express from 'express';
import path from 'path';
import cors from 'cors';
import bodyParser from 'body-parser';
import eaa from 'express-async-await';
import dotenv from 'dotenv';

import userRouter from './api/users';

if (process.env.NODE_ENV === 'test') {
  dotenv.config({ path: '../.env' });
}

const app = express();

eaa(app);

app.use(express.static(path.join(__dirname, '../public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use('/api/v0', userRouter);

export default app;
