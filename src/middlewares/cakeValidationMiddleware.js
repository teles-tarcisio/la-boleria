/* eslint-disable import/extensions */
/* eslint-disable import/prefer-default-export */

import { newCakeSchema } from '../schemas/index.js';

export async function cakeValidationMiddleware(req, res, next) {
  const newCakeData = req.body;
  const newCakeValidation = newCakeSchema.validate(newCakeData);

  if (newCakeValidation.error) {
    const errorDetails = newCakeValidation.error.details[0];
    if (errorDetails.path[0] === 'image') {
      return res.status(422).send(errorDetails.message);
    }
    return res.status(400).send(errorDetails.message);
  }
  res.locals.newCakeData = newCakeData;
  return next();
}
