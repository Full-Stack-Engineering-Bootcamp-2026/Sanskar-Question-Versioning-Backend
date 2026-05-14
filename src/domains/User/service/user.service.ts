import { Service } from "typedi";
import { UserRepository } from "../repository/user.repository";
import { LoggerService } from "../../../common/utils/logger.service";
import { BadRequestException, NotFoundException, UnauthorizedException } from "../../../common/exceptions";
import bcrypt from 'bcrypt'
import { LoginResponseDto, UserCreateDto, UserLoginDto } from "../dto/user.dto";
import { UserRole } from "../entities/user.entity";
import jwt from "jsonwebtoken"
@Service()
export class UserService {
    constructor(
        private readonly repository: UserRepository,
        private readonly logger: LoggerService,
    ) { }
    public async register(data: UserCreateDto): Promise<void> {
        this.logger.info(`Registering user : ${data.email}`);
        const existing = await this.repository.findByEmail(data.email);
        if (existing) {
            throw new BadRequestException(`User already exists with this email..`);
        }
        const { name, email, password } = data;
        const hashPassword = await bcrypt.hash(password, 10);
        const user = await this.repository.createUser({
            name,
            email,
            password: hashPassword,
            role: data.role || UserRole.USER
        });
        this.logger.info(`User Registered Succesfully with email ${email}`);
    }
    public async login(data: UserLoginDto): Promise<LoginResponseDto> {
        this.logger.info(`Logging in user : ${data.email}`);
        const user = await this.repository.findByEmail(data.email);
        if (!user)
            throw new NotFoundException("User not found");
        const match = await bcrypt.compare(data.password, user.password);
        if (!match)
            throw new UnauthorizedException("Invalid password");
        const token = jwt.sign({
            userId: user.id,
            email: user.email,
            role: user.role
        },
            process.env.JWT_SECRET as string,
            { expiresIn: "1d" }
        )
        return {
            accessToken: token,
            tokenType: "Bearer",
            user: {
                publicId: user.publicId,
                name: user.name,
                email: user.email,
                role: user.role,
                createdAt: user.createdAt
            }
        };
    }
}