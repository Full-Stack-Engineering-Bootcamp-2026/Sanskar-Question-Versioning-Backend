import { Router } from 'express';
import { Service } from 'typedi';
import { QuizController } from '../controller/quiz.controller';
import { authenticate } from '../../../common/middleware/authenticate.middleware';
import { validate } from '../../../common/middleware/validate.middleware';

import { createQuizSchema, updateQuizSchema } from '../validator/quiz.validator';
import { requireRole } from '../../../common/middleware/authorize.middleware';
import { UserRole } from '../../User/entities/user.entity';
import { asyncHandler } from '../../../common/utils/async-handler';

@Service()
export class QuizRoutes {
  public router: Router;

  constructor(private readonly controller: QuizController) {
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
      validate(createQuizSchema),
      asyncHandler(this.controller.createQuiz.bind(this.controller))
    );
    this.router.get(
      "/",
      authenticate,
      asyncHandler(this.controller.getAllQuizzes.bind(this.controller))
    );
    this.router.get(
      "/:publicId",
      authenticate,
      asyncHandler(this.controller.getQuizByPublicId.bind(this.controller))
    );

    this.router.put(
      "/:publicId",
      authenticate,
      requireRole(UserRole.ADMIN),
      validate(updateQuizSchema),
      this.controller.updateQuiz.bind(this.controller)
    )
    this.router.patch(
      "/:publicId",
      authenticate,
      requireRole(UserRole.ADMIN),
      this.controller.deleteQuiz.bind(this.controller)
    )
  }
}
