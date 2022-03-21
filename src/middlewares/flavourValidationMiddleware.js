/* eslint-disable import/extensions */
/* eslint-disable import/prefer-default-export */

import { newFlavourSchema } from '../schemas/index.js';

export async function flavourValidationMiddleware(req, res, next) {
  const newFlavourData = req.body;
  const newFlavourValidation = newFlavourSchema.validate(newFlavourData);

  if (newFlavourValidation.error) {
    const errorDetails = newFlavourValidation.error.details[0];
    res.status(400).send(errorDetails.message);
  }

  res.locals.newFlavourData = newFlavourValidation.value;
  next();
}
