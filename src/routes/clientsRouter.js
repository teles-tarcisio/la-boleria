/* eslint-disable linebreak-style */
import { Router } from 'express';

const clientsRouter = Router();

clientsRouter.get('/clients', ((req, res) => {
  res.sendStatus(501);
}));





export default clientsRouter;