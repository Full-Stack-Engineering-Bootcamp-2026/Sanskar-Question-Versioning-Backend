import Joi from "joi";

export const submitAttemptSchema = Joi.object({
  quizPublicId: Joi.string().uuid().required(),
  answers: Joi.array().items(Joi.object({
    questionVersionPublicId: Joi.string().uuid().required(),
    selectedOptions: Joi.array().items(Joi.string().uuid()),
    textAnswer: Joi.string().allow("").optional(),
  })
  ).min(1).required(),
});