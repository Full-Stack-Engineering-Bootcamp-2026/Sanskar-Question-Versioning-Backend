import { Service } from "typedi";
import { QuizService } from "../service/quiz.service";
import { AuthRequest } from "../../../common/interfaces/auth-request.interface";
import { Request, Response } from "express";
import { CreateQuizDto } from "../dto/quiz.dto";
import { generateResponse } from "../../../common/utils/response.util";
import { HttpStatus } from "../../../common/constants/http-status.constants";
import { UpdateQuizDto } from "../validator/quiz.validator";

@Service()
export class QuizController {
  constructor(private readonly service: QuizService) { }

  public async createQuiz(req: AuthRequest, res: Response) {
    const data = await this.service.createQuiz(req.body as CreateQuizDto, req.user!.id);
    return generateResponse(res, {
      statusCode: HttpStatus.CREATED,
      message: "Quiz Created Successfully",
      data
    });
  }

  public async getAllQuizzes(req: Request, res: Response) {
    const quizzes = await this.service.getAllQuizzes();
    return generateResponse(res, {
      statusCode: HttpStatus.OK,
      message: "Quizzes Fetched Successfully",
      data: quizzes
    });
  }
  public async updateQuiz(
    req: Request<
      { publicId: string },
      {},
      UpdateQuizDto
    >,

    res: Response
  ) {

    const data =
      await this.service.updateQuiz(
        req.params.publicId,
        req.body
      )

    return generateResponse(res, {
      statusCode: HttpStatus.OK,
      message:
        "Quiz updated successfully",
      data,
    })
  }

  public async getQuizByPublicId(req: Request, res: Response) {
    const { publicId } = req.params
    const quiz = await this.service.getQuizByPublicId(publicId as string);
    return generateResponse(res, {
      statusCode: HttpStatus.OK,
      message: `Quiz #${publicId} Fetched Successfully`,
      data: quiz
    })
  }

  public async deleteQuiz(
    req: Request<{ publicId: string }>,
    res: Response
  ) {

    await this.service.deleteQuiz(
      req.params.publicId
    )

    return generateResponse(res, {
      statusCode: HttpStatus.OK,
      message: "Quiz deleted successfully",
    })
  }
}

