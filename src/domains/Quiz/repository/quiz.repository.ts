import { Service } from "typedi";
import { In, Repository } from "typeorm";
import { AppDataSource } from "../../../db/db";
import { Quiz } from "../entities/quiz.entity";
import { CreateQuizPayload, CreateQuizQuestionMappingsPayload } from "../dto/quiz.dto";
import { Question } from "../../Question/entities/question.entity";
import { QuizQuestion } from "../../QuizQuestion/entities/quiz-question.entity";
import { QuestionVersion } from "../../QuestionVersion/entities/question-version.entity";


@Service()
export class QuizRepository {
  private quizRepository: Repository<Quiz>;
  private questionRepository: Repository<Question>;
  private quizQuestionRepository: Repository<QuizQuestion>;
  private questionVersionRepository: Repository<QuestionVersion>;

  constructor() {
    this.quizRepository = AppDataSource.getRepository(Quiz);
    this.questionRepository = AppDataSource.getRepository(Question);
    this.quizQuestionRepository = AppDataSource.getRepository(QuizQuestion);
    this.questionVersionRepository = AppDataSource.getRepository(QuestionVersion);
  }

  public createQuiz(data: CreateQuizPayload) {
    const quiz = this.quizRepository.create({
      title: data.title,
      createdBy: {
        id: data.createdById
      }
    })
    return this.quizRepository.save(quiz);
  }

  public findQuestionsByPublicIds(publicIds: string[]) {
    return this.questionRepository.find({
      where: {
        publicId: In(publicIds),
        isDeleted: false
      }
    });
  }

  public createQuizQuestionMappings(data: CreateQuizQuestionMappingsPayload) {
    const mappings = data.questions.map((question, index) =>
      this.quizQuestionRepository.create({
        quiz: {
          id: data.quizId
        },
        question: {
          id: question.id
        },
        orderIndex: index + 1
      })
    );
    return this.quizQuestionRepository.save(mappings);
  }

  public getAllQuizzes() {
    return this.quizRepository.find({
      where: {
        isDeleted: false
      }
    })
  }

  public findQuizByPublicId(publicId: string) {
    return this.quizRepository.findOne({
      where: {
        publicId,
        isDeleted: false
      }
    })
  }

  public getQuizQuestions(quizId: number) {
    return this.quizQuestionRepository.find({
      where: {
        quiz: {
          id: quizId
        }
      },
      relations: {
        question: true
      },
      order: {
        orderIndex: "ASC"
      }
    })
  }

  public getLatestQuestionVersion(questionId: number) {
    return this.questionVersionRepository.findOne({
      where: {
        question: {
          id: questionId
        }
      },
      relations: {
        options: true
      },
      order: {
        versionNumber: "DESC"
      }
    })
  }

  public async softDeleteQuiz(
    quizId: number
  ) {

    await this.quizRepository.update(
      {
        id: quizId,
      },

      {
        isDeleted: true,
      }
    )
  }

}
