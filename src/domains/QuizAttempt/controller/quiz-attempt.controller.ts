import { Response } from "express";
import { Service } from "typedi";
import { QuizAttemptService } from "../service/quiz-attempt.service";
import { AuthRequest } from "../../../common/interfaces/auth-request.interface";
import { SubmitAttemptDto } from "../dto/quiz-attempt.dto";
import { generateResponse } from "../../../common/utils/response.util";
import { HttpStatus } from "../../../common/constants/http-status.constants";

@Service()
export class QuizAttemptController {
  constructor(private readonly service: QuizAttemptService) { }
  public async submitAttempt(req: AuthRequest, res: Response) {
    const data = await this.service.submitAttempt(req.body as SubmitAttemptDto, req.user!.id);
    return generateResponse(res, {
      statusCode: HttpStatus.CREATED,
      message: "Quiz submitted successfully",
      data
    });
  }

  public async getMyAttempts(req: AuthRequest, res: Response) {
    const data = await this.service.getMyAttempts(req.user!.id);
    return generateResponse(res, {
      statusCode: HttpStatus.OK,
      message: "Attempts fetched successfully",
      data
    });
  }

  public async getAttemptByPublicId(req: AuthRequest, res: Response) {
    const { publicId } = req.params;
    const data = await this.service.getAttemptByPublicId(publicId as string);
    return generateResponse(res, {
      statusCode: HttpStatus.OK,
      message: "Attempt fetched successfully",
      data
    });
  }
}