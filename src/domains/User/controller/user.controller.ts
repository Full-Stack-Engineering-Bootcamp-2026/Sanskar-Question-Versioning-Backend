import { Service } from "typedi";
import { UserService } from "../service/user.service";
import { generateResponse } from "../../../common/utils/response.util";
import { HttpStatus } from "../../../common/constants/http-status.constants";
import { SuccessMessages } from "../../../common/constants/success-messages.constants";
import { UserCreateDto, UserLoginDto } from "../dto/user.dto";
import { Request, Response } from "express";

@Service()
export class UserController {
    constructor(private readonly service: UserService) { }
    public async register(req: Request, res: Response): Promise<Response> {
        const data = await this.service.register(req.body as UserCreateDto);
        return generateResponse(res, {
            statusCode: HttpStatus.CREATED,
            message: SuccessMessages.CREATED,
            data,
        });
    }

    public async login(req: Request, res: Response) {
        const data = await this.service.login(req.body as UserLoginDto);
        return generateResponse(res, {
            statusCode: HttpStatus.OK,
            message: SuccessMessages.LOGIN,
            data,
        });
    }
}