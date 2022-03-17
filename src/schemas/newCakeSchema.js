import Joi from 'joi';

const newCakeSchema = Joi.object({
  name: Joi.string().trim().min(2),
  price: Joi.number().precision(2).min(0.01),
  description: Joi.string().trim().allow(''),
  image: Joi.string().trim().uri(),
});

export default newCakeSchema;
