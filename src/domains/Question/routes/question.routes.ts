import { Service } from "typedi";
import { QuestionController } from "../controller/question.controller";
import { Router } from "express";
import { authenticate } from "../../../common/middleware/authenticate.middleware";
import { requireRole } from "../../../common/middleware/authorize.middleware";
import { UserRole } from "../../User/entities/user.entity";
import { validate } from "../../../common/middleware/validate.middleware";
import { createQuestionSchema } from "../validator/question.validator";

@Service()
export class QuestionRoutes {
  public router: Router
  constructor(private readonly controller: QuestionController) {
    this.router = Router();
    this.addRoutes();
  }
  public getRoutes(): Router {
    return this.router;
  }

  private addRoutes(): void {
    this.router.post(
      "/",
      authenticate,
      requireRole(UserRole.ADMIN),
      validate(createQuestionSchema),
      this.controller.createQuestion.bind(this.controller)
    )
    this.router.put(
      "/:publicId",
      authenticate,
      requireRole(UserRole.ADMIN),
      validate(createQuestionSchema),
      this.controller.updateQuestion.bind(this.controller)
    );

    this.router.get(
      "/",
      authenticate,
      this.controller.getQuestions.bind(this.controller)
    );

    this.router.get(
      "/:publicId/versions",
      authenticate,
      requireRole(UserRole.ADMIN),
      this.controller.getQuestionVersions.bind(this.controller)
    );

  }

}