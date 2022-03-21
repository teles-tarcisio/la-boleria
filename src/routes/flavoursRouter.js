/* eslint-disable import/extensions */

import { Router } from 'express';

import { flavourValidationMiddleware } from '../middlewares/index.js';

import { insertFlavour } from '../controllers/index.js';

const flavoursRouter = Router();

flavoursRouter.post('/flavours', flavourValidationMiddleware, insertFlavour);

export default flavoursRouter;
