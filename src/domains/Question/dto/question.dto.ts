import { AnswerType } from "../../QuestionVersion/entities/question-version.entity"
import { Question } from "../entities/question.entity"

export interface CreateQuestionVersionPayload {
  questionText: string
  answerType: AnswerType
  options?: string[]
  createdById: number
}

export interface CreateNewVersionPayload {
  question: Question;
  versionNumber: number;
  questionText: string;
  answerType: AnswerType;
  options?: string[];
}

export interface CreateQuestionDto {
  questionText: string
  answerType: AnswerType
  options?: string[]
}

export interface UpdateQuestionDto {
  questionText: string
  answerType: AnswerType
  options?: string[]
}