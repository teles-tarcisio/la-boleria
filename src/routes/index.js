/* eslint-disable import/extensions */

import { Router } from 'express';

import cakesRouter from './cakesRouter.js';
import clientsRouter from './clientsRouter.js';
import ordersRouter from './ordersRouter.js';
import flavoursRouter from './flavoursRouter.js';

const mainRouter = Router();
mainRouter.use(flavoursRouter);
mainRouter.use(cakesRouter);
mainRouter.use(clientsRouter);
mainRouter.use(ordersRouter);

export default mainRouter;
