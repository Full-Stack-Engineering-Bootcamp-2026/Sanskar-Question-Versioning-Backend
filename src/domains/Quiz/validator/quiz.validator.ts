import Joi from 'joi';

export const createQuizSchema = Joi.object({
  title: Joi.string().trim().min(3).max(100).required(),
  questionPublicIds: Joi.array().items(Joi.string().uuid().required()).min(1).required()
})
