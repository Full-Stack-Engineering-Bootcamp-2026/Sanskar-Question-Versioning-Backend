import { Router } from 'express';
import { Service } from 'typedi';
import { authenticate } from '../../../common/middleware/authenticate.middleware';
import { validate } from '../../../common/middleware/validate.middleware';
import { asyncHandler } from '../../../common/utils/async-handler';
import { submitAttemptSchema } from '../validator/quiz-attempt.validator';
import { QuizAttemptController } from '../controller/quiz-attempt.controller';

@Service()
export class QuizAttemptRoutes {
  public router: Router;

  constructor(private readonly controller: QuizAttemptController) {
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
      validate(submitAttemptSchema),
      asyncHandler(this.controller.submitAttempt.bind(this.controller))
    );

    this.router.get(
      "/my",
      authenticate,
      asyncHandler(
        this.controller.getMyAttempts.bind(
          this.controller
        )
      )
    );

    this.router.get(
      "/:publicId",
      authenticate,
      asyncHandler(
        this.controller.getAttemptByPublicId.bind(
          this.controller
        )
      )
    );
  }
}
