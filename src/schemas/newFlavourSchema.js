import Joi from 'joi';

const newFlavourSchema = Joi.object({
  name: Joi.string().trim().min(2),
});

export default newFlavourSchema;
