/* eslint-disable import/extensions */
/* eslint-disable linebreak-style */

import { Router } from 'express';

import { clientValidationMiddleware } from '../middlewares/index.js';

import { insertClient, getClientOrders } from '../controllers/index.js';

const clientsRouter = Router();

clientsRouter.post('/clients', clientValidationMiddleware, insertClient);

clientsRouter.get('/clients/:id/orders', getClientOrders);

export default clientsRouter;
