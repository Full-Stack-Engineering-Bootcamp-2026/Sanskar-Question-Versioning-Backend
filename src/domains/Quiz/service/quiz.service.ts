import { Service } from "typedi";
import { QuizRepository } from "../repository/quiz.repository";
import { CreateQuizDto } from "../dto/quiz.dto";
import { NotFoundException } from "../../../common/exceptions";

@Service()
export class QuizService {
  constructor(private readonly repository: QuizRepository) { }
  public async createQuiz(data: CreateQuizDto, createdById: number) {
    const questions = await this.repository.findQuestionsByPublicIds(data.questionPublicIds);
    if (questions.length !== data.questionPublicIds.length) {
      throw new NotFoundException("One or more questions not found");
    }

    const quiz = await this.repository.createQuiz({
      title: data.title,
      createdById
    });
    await this.repository.createQuizQuestionMappings({
      quizId: quiz.id,
      questions
    })
    return {
      publicId: quiz.publicId,
      title: quiz.title
    }
  }

  public async getAllQuizzes() {
    return this.repository.getAllQuizzes();
  }


  public async deleteQuiz(
    publicId: string
  ) {

    const quiz =
      await this.repository.findQuizByPublicId(
        publicId
      )

    if (!quiz) {
      throw new NotFoundException(
        "Quiz not found"
      )
    }

    await this.repository.softDeleteQuiz(
      quiz.id
    )
  }
  public async getQuizByPublicId(publicId: string) {
    const quiz = await this.repository.findQuizByPublicId(publicId);
    if (!quiz)
      throw new NotFoundException("Quiz Not Found!!");
    const mappings = await this.repository.getQuizQuestions(quiz.id);
    const promises = mappings.map(async mapping => {
      const latestVersion = await this.repository.getLatestQuestionVersion(mapping.question.id);
      return {
        questionPublicId: mapping.question.publicId,
        questionVersionPublicId: latestVersion?.publicId,
        questionText: latestVersion?.questionText,
        answerType: latestVersion?.answerType,
        versionNumber: latestVersion?.versionNumber,
        options: latestVersion?.options || []
      }
    })
    const questions = await Promise.all(promises)
    return {
      publicId: quiz.publicId,
      title: quiz.title,
      questions
    }
  }
}