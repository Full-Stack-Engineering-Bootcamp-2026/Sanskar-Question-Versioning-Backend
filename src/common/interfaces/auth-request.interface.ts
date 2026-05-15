import { Request } from "express";
import { UserRole } from "../../domains/User/entities/user.entity";


export interface AuthRequest extends Request {
  user?: {
    id: number;
    email: string;
    role: UserRole;
  };
}