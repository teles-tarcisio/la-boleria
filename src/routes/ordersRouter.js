/* eslint-disable import/extensions */
/* eslint-disable linebreak-style */

import { Router } from 'express';

import { orderValidationMiddleware } from '../middlewares/index.js';

import { insertOrder } from '../controllers/index.js';

const ordersRouter = Router();

ordersRouter.post('/orders', orderValidationMiddleware, insertOrder);

export default ordersRouter;
