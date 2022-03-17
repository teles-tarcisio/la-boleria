import { Router } from 'express';

import { cakeValidationMiddleware } from '../middlewares/index.js';

import { insertCake } from '../controllers/index.js';

const cakesRouter = Router();

cakesRouter.post('/cakes', cakeValidationMiddleware, insertCake);

export default cakesRouter;
