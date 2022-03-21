/* eslint-disable import/extensions */
/* eslint-disable linebreak-style */

import { Router } from 'express';
import { orderValidationMiddleware } from '../middlewares/index.js';
import { insertOrder, getOrders, getOrderById } from '../controllers/index.js';

const ordersRouter = Router();

ordersRouter.post('/orders', orderValidationMiddleware, insertOrder);

ordersRouter.get('/orders', getOrders);

ordersRouter.get('/orders/:id', getOrderById);

export default ordersRouter;
