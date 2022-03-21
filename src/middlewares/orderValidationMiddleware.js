/* eslint-disable import/extensions */
/* eslint-disable import/prefer-default-export */

import { newOrderSchema } from '../schemas/index.js';

export async function orderValidationMiddleware(req, res, next) {
  const newOrderData = req.body;
  const newOrderValidation = newOrderSchema.validate(newOrderData);

  if (newOrderValidation.error) {
    const errorDetails = newOrderValidation.error.details[0];
    return res.status(400).send(errorDetails.message);
  }

  res.locals.newOrderData = newOrderData;
  return next();
}
