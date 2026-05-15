import Joi from 'joi';
import { AnswerType } from '../../QuestionVersion/entities/question-version.entity';

export const createQuestionSchema = Joi.object({
  questionText: Joi.string().trim().min(5).max(500).required(),
  answerType: Joi.string().valid(...Object.values(AnswerType)).required(),
  options: Joi.when("answerType", {
    is: Joi.valid(AnswerType.SINGLE_SELECT, AnswerType.MULTI_SELECT),
    then: Joi.array().items(Joi.string().trim().required()).min(2).required(),
    otherwise: Joi.forbidden()
  })
})
