import Joi from 'joi';

const newOrderSchema = Joi.object({
  clientId: Joi.any(),
  cakeId: Joi.any(),
  quantity: Joi.number().integer().min(1).max(4),
  totalPrice: Joi.any(),
});

export default newOrderSchema;
