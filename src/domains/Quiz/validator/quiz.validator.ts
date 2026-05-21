import Joi from 'joi';

export const createQuizSchema = Joi.object({
  title: Joi.string().trim().min(3).max(100).required(),
  questionPublicIds: Joi.array().items(Joi.string().uuid().required()).min(1).required()
})

export const updateQuizSchema =
  Joi.object({
    title: Joi.string()
      .trim()
      .min(3)
      .max(100)
      .required(),

    questionPublicIds:
      Joi.array()
        .items(
          Joi.string()
            .uuid()
        )
        .min(1)
        .required(),
  })

export interface UpdateQuizDto {
  title: string

  questionPublicIds: string[]
}