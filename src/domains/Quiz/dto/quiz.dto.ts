import { Question } from "../../Question/entities/question.entity"

export interface CreateQuizDto {
  title: string
  questionPublicIds: string[]
}
export interface CreateQuizPayload {
  title: string
  createdById: number
}
export interface CreateQuizQuestionMappingsPayload {
  quizId: number
  questions: Question[]
}