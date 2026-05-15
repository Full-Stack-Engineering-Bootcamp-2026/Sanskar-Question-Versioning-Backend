import { Service } from "typedi";
import { QuestionRepository } from "../repository/question.repository";
import { CreateQuestionDto, UpdateQuestionDto } from "../dto/question.dto";
import { NotFoundException } from "../../../common/exceptions";

@Service()
export class QuestionService {
  constructor(private readonly repository: QuestionRepository) { }
  public async createQuestion(data: CreateQuestionDto, createdById: number) {
    return this.repository.createQuestionWithVersion({
      ...data, createdById
    })
  }

  public async updateQuestion(publicId: string, data: UpdateQuestionDto) {
    const question = await this.repository.findQuestionByPublicId(publicId);
    if (!question)
      throw new NotFoundException("Question Not Found");
    const latestVersion = await this.repository.getLatestVersion(question.id);
    if (!latestVersion)
      throw new NotFoundException("Question version not found");
    return this.repository.createNewVersion({
      question,
      versionNumber: latestVersion.versionNumber + 1,
      questionText: data.questionText,
      answerType: data.answerType,
      options: data.options
    })
  }

  public async getQuestions() {
    const questions = await this.repository.getAllQuestions();
    return questions.map(question => {
      const latestVersion = question.versions.sort(
        (a, b) => b.versionNumber - a.versionNumber
      )[0]
      return {
        publicId: question.publicId,
        questionText: latestVersion.questionText,
        answerType: latestVersion.answerType,
        versionNumber: latestVersion.versionNumber,
        options: latestVersion.options
      }
    })
  }

  public async getQuestionVersions(publicId: string) {
    const question = await this.repository.findQuestionByPublicId(publicId);
    if (!question)
      throw new NotFoundException("Question not found");
    return this.repository.getQuestionVersions(question.id);
  }
}