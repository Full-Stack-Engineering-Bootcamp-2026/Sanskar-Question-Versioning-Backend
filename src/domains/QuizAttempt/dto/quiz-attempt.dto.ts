interface Answer {
  questionVersionPublicId: string
  selectedOptions?: string[]
  textAnswer?: string
}
export interface SubmitAttemptDto {
  quizPublicId: string
  answers: Answer[]
  attemptNumber: number
}
