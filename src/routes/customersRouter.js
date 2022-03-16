import { Router } from 'express';

const customersRouter = Router();

customersRouter.get('/customers', ((req, res) => {
  res.sendStatus(501);
}));





export default customersRouter;
