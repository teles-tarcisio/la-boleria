import { Router } from 'express';

import cakesRouter from './cakesRouter.js';

import clientsRouter from './clientsRouter.js';


const mainRouter = Router();
mainRouter.use(cakesRouter);
mainRouter.use(clientsRouter);

export default mainRouter;