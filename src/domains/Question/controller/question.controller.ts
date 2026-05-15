import { Service } from "typedi";
import { QuestionService } from "../service/question.service";
import { Request, Response } from "express";
import { AuthRequest } from "../../../common/interfaces/auth-request.interface";
import { UpdateQuestionDto } from "../dto/question.dto";
import { generateResponse } from "../../../common/utils/response.util";
import { HttpStatus } from "../../../common/constants/http-status.constants";

@Service()
export class QuestionController {
  constructor(private readonly service: QuestionService) { }
  public async createQuestion(req: AuthRequest, res: Response) {
    const data = await this.service.createQuestion(req.body, req.user!.id)
    return generateResponse(res, {
      statusCode: HttpStatus.OK,
      message: "Question created successfully",
      data
    })
  }
  public async updateQuestion(req: Request<{ publicId: string }, {}, UpdateQuestionDto>, res: Response) {
    const data = await this.service.updateQuestion(
      req.params.publicId,
      req.body
    );

    return generateResponse(res, {
      statusCode: HttpStatus.OK,
      message: "Question updated successfully",
      data,
    });
  }
  public async getQuestions(_req: Request, res: Response) {
    const data = await this.service.getQuestions();
    return generateResponse(res, {
      statusCode: HttpStatus.OK,
      message: "Questions fetched successfully",
      data,
    });
  }

  public async getQuestionVersions(
    req: Request<{ publicId: string }>, res: Response) {
    const data = await this.service.getQuestionVersions(
      req.params.publicId
    );

    return generateResponse(res, {
      statusCode: HttpStatus.OK,
      message: "Question versions fetched successfully",
      data,
    });
  }

}