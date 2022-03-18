/* eslint-disable import/extensions */

import { Router } from 'express';

import cakesRouter from './cakesRouter.js';
import clientsRouter from './clientsRouter.js';
import ordersRouter from './ordersRouter.js';

const mainRouter = Router();
mainRouter.use(cakesRouter);
mainRouter.use(clientsRouter);
mainRouter.use(ordersRouter);

export default mainRouter;
