/* eslint-disable import/extensions */
/* eslint-disable import/prefer-default-export */

import { newClientSchema } from '../schemas/index.js';

export async function clientValidationMiddleware(req, res, next) {
  const newClientData = req.body;
  const newClientValidation = newClientSchema.validate(newClientData);

  if (newClientValidation.error) {
    const errorDetails = newClientValidation.error.details[0];
    return res.status(400).send(errorDetails.message);
  }
  res.locals.newClientData = newClientData;
  return next();
}
