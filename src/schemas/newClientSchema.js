import Joi from 'joi';

const newClientSchema = Joi.object({
  name: Joi.string().trim().required(),
  address: Joi.string().trim().required(),
  phone: Joi.string().pattern(/^[0-9]+$/).min(10).max(11),
});

export default newClientSchema;
