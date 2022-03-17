/* eslint-disable import/extensions */
/* eslint-disable import/prefer-default-export */

// import { stripHtml } from 'string-strip-html';

import dbConnection from '../database/database.js';

// import { newCakeSchema } from '../schemas/index.js';

export default async function cakeValidationMiddleware(req, res, next) {
  // const newCakeData = req.body;
  console.log('reached middleware');

  /*
  const newCakeValidation = newCakeSchema.validate(newCakeData);
  if (newCakeValidation.error) {
    res.status(400).send(newCakeValidation.error.details[0].message);
    return;
  }
  */

  next();
}
