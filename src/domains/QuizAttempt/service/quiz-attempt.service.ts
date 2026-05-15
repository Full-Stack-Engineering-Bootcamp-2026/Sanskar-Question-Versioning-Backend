import { Service } from "typedi";
import { QuizAttemptRepository } from "../repository/quiz-attempt.repository";
import { SubmitAttemptDto } from "../dto/quiz-attempt.dto";
import { NotFoundException } from "../../../common/exceptions";
import { AttemptAnswer } from "../../AttemptAnswer/entities/attempt-answer.entity";

@Service()
export class QuizAttemptService {
  constructor(private readonly repository: QuizAttemptRepository) { }
  public async submitAttempt(data: SubmitAttemptDto, userId: number) {
    const quiz = await this.repository.findQuizByPublicId(data.quizPublicId);

    if (!quiz) {
      throw new NotFoundException("Quiz not found");
    }

    const previousAttempts = await this.repository.countUserQuizAttempts(userId, quiz.id);
    const attemptNumber = previousAttempts + 1;
    const attempt = await this.repository.createAttempt({
      userId,
      quizId: quiz.id,
      attemptNumber: attemptNumber
    });

    const answers: AttemptAnswer[] = [];

    for (const item of data.answers) {
      const questionVersion = await this.repository.findQuestionVersionByPublicId(
        item.questionVersionPublicId
      );

      if (!questionVersion) {
        throw new NotFoundException("Question version not found");
      }

      const answer = new AttemptAnswer();
      answer.attempt = attempt;
      answer.questionVersion = questionVersion;
      answer.questionSnapshot = {
        questionText: questionVersion.questionText,
        answerType: questionVersion.answerType,
        options: questionVersion.options?.map(option => option.optionText) || [],
      };
      answer.userAnswer = item.selectedOptions?.length ? item.selectedOptions : item.textAnswer || "";
      answers.push(answer);
    }

    await this.repository.createAttemptAnswers(answers);
    return {
      publicId: attempt.publicId,
    };
  }

  public async getMyAttempts(userId: number) {
    return this.repository.getUserAttempts(userId);
  }

  public async getAttemptByPublicId(publicId: string) {
    const attempt = await this.repository.getAttemptByPublicId(publicId);
    if (!attempt) {
      throw new NotFoundException("Attempt not found");
    }
    return attempt;
  }


}