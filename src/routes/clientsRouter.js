/* eslint-disable import/extensions */
/* eslint-disable linebreak-style */

import { Router } from 'express';

import { clientValidationMiddleware } from '../middlewares/index.js';

import { insertClient } from '../controllers/index.js';

const clientsRouter = Router();

clientsRouter.post('/clients', clientValidationMiddleware, insertClient);

clientsRouter.get('/clients', ((req, res) => {
  res.sendStatus(501);
}));

export default clientsRouter;
