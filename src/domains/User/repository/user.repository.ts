import { Repository } from "typeorm";
import { User } from "../entities/user.entity";
import { AppDataSource } from "../../../db/db";
import { Service } from "typedi";

@Service()
export class UserRepository {
    private repository: Repository<User>;
    constructor() {
        this.repository = AppDataSource.getRepository(User);
    }
    async findByEmail(email: string): Promise<User | null> {
        return this.repository.findOne({ where: { email } });
    }

    async createUser(data: Partial<User>): Promise<User> {
        const user = this.repository.create(data);
        return this.repository.save(user);
    }
}