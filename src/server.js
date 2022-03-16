import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import mainRouter from './routes/index.js';

const server = express();
server.use(express.json());
server.use(cors());

server.use(mainRouter);

server.listen(process.env.SERVER_PORT, () => {
  console.log('Server listening, :' + process.env.SERVER_PORT);
});