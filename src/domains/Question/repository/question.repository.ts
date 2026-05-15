import { Service } from "typedi";
import { Repository } from "typeorm";
import { Question } from "../entities/question.entity";
import { QuestionVersion } from "../../QuestionVersion/entities/question-version.entity";
import { QuestionOption } from "../../QuestionOption/entities/question-option.entity";
import { AppDataSource } from "../../../db/db";
import { CreateNewVersionPayload, CreateQuestionVersionPayload } from "../dto/question.dto";

@Service()
export class QuestionRepository {
  private questionRepository: Repository<Question>;
  private versionRepository: Repository<QuestionVersion>;
  private optionRepository: Repository<QuestionOption>;
  constructor() {
    this.questionRepository = AppDataSource.getRepository(Question);
    this.versionRepository = AppDataSource.getRepository(QuestionVersion);
    this.optionRepository = AppDataSource.getRepository(QuestionOption);
  }

  public async createQuestionWithVersion(data: CreateQuestionVersionPayload) {
    return AppDataSource.transaction(async manager => {
      const question = manager.create(Question, {
        createdBy: {
          id: data.createdById
        }
      });
      const savedQuestion = await manager.save(question);

      const version = manager.create(QuestionVersion, {
        question: savedQuestion,
        versionNumber: 1,
        questionText: data.questionText,
        answerType: data.answerType
      });
      const savedVersion = await manager.save(version);
      if (data.options?.length) {
        const options = data.options.map(option =>
          manager.create(QuestionOption, {
            questionVersion: savedVersion,
            optionText: option
          })
        );
        await manager.save(options);
      }
      return savedQuestion;
    })
  }

  public async findQuestionByPublicId(publicId: string) {
    return this.questionRepository.findOne({
      where: {
        publicId,
        isDeleted: false
      }
    });
  }

  public async getLatestVersion(questionId: number) {
    return this.versionRepository.findOne({
      where: {
        question: {
          id: questionId
        }
      },
      relations: {
        options: true
      },
      order: {
        versionNumber: "DESC",
      }
    });
  }

  public async createNewVersion(data: CreateNewVersionPayload) {
    return AppDataSource.transaction(async manager => {
      const version = manager.create(QuestionVersion, {
        question: data.question,
        versionNumber: data.versionNumber,
        questionText: data.questionText,
        answerType: data.answerType
      });
      const savedVersion = await manager.save(version);
      if (data.options?.length) {
        const options = data.options.map((option) =>
          manager.create(QuestionOption, {
            questionVersion: savedVersion,
            optionText: option,
          })
        );
        await manager.save(options);
      }
      return savedVersion;
    })
  }

  public async getAllQuestions() {
    return this.questionRepository.find({
      where: {
        isDeleted: false
      },
      relations: {
        versions: {
          options: true
        }
      }
    })
  };

  public async getQuestionVersions(questionId: number) {
    return this.versionRepository.find({
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
    });
  }
}