import { Router } from 'express';

import customersRouter from './customersRouter.js';

const mainRouter = Router();
mainRouter.use(customersRouter);

export default mainRouter;