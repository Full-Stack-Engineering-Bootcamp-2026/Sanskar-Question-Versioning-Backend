import { Service } from "typedi";
import { Repository } from "typeorm";

import { AppDataSource } from "../../../db/db";

import { Quiz } from "../../Quiz/entities/quiz.entity";

import { QuizAttempt } from "../entities/quiz-attempt.entity";

import { AttemptAnswer } from "../../AttemptAnswer/entities/attempt-answer.entity";

import { QuestionVersion } from "../../QuestionVersion/entities/question-version.entity";

@Service()
export class QuizAttemptRepository {
  private quizRepository: Repository<Quiz>;
  private quizAttemptRepository: Repository<QuizAttempt>;
  private attemptAnswerRepository: Repository<AttemptAnswer>;
  private questionVersionRepository: Repository<QuestionVersion>;

  constructor() {
    this.quizRepository = AppDataSource.getRepository(Quiz);
    this.quizAttemptRepository = AppDataSource.getRepository(QuizAttempt);
    this.attemptAnswerRepository = AppDataSource.getRepository(AttemptAnswer);
    this.questionVersionRepository = AppDataSource.getRepository(QuestionVersion);
  }

  public findQuizByPublicId(publicId: string) {
    return this.quizRepository.findOne({
      where: {
        publicId
      }
    });
  }

  public createAttempt(data: { userId: number; quizId: number, attemptNumber: number }) {
    const attempt = this.quizAttemptRepository.create({
      user: {
        id: data.userId,
      },

      quiz: {
        id: data.quizId,
      },
      attemptNumber: data.attemptNumber,
      submittedAt:
        new Date(),
    });
    return this.quizAttemptRepository.save(attempt);
  }

  public findQuestionVersionByPublicId(publicId: string) {
    return this.questionVersionRepository.findOne({
      where: {
        publicId
      },

      relations: {
        options: true,
      }
    });
  }

  public createAttemptAnswers(answers: AttemptAnswer[]) {
    return this.attemptAnswerRepository.save(answers);
  }

  public getUserAttempts(userId: number) {
    return this.quizAttemptRepository.find({
      where: {
        user: {
          id: userId,
        },
      },

      relations: {
        quiz: true,
      },

      order: {
        startedAt: "DESC"
      },
    });
  }

  public getAttemptByPublicId(publicId: string) {
    return this.quizAttemptRepository.findOne({
      where: {
        publicId,
      },
      relations: {
        quiz: true,
        answers: {
          questionVersion: {
            options: true,
          }
        }
      }
    });
  }
  public countUserQuizAttempts(userId: number, quizId: number) {
    return this.quizAttemptRepository.count({
      where: {
        user: {
          id: userId,
        },
        quiz: {
          id: quizId,
        },
      },
    });
  }
}