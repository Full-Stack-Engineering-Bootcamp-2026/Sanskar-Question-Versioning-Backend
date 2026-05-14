import Joi from 'joi';
import { UserRole } from '../entities/user.entity';

export const registerUserSchema = Joi.object({
  name: Joi.string().required().min(3).max(30).messages({
    "string.base": "Name must be a string",
    "string.empty": "Name is required",
    "string.min": "Name must be at least 3 characters long",
    "string.max": "Name cannot exceed 30 characters",
    "any.required": "Name is required",
  }),
  email: Joi.string().trim().lowercase().email().required().messages({
    "string.base": "Email must be a string",
    "string.empty": "Email is required",
    "string.email": "Please enter a valid email address",
    "any.required": "Email is required",
  }),
  password: Joi.string().min(6).max(20).required().messages({
    "string.base": "Password must be a string",
    "string.empty": "Password is required",
    "string.min": "Password must be at least 6 characters long",
    "string.max": "Password cannot exceed 20 characters",
    "any.required": "Password is required",
  }),
  role: Joi.string().valid(...Object.values(UserRole)).messages({
    "string.base": "Role must be a string",
    "any.only": `Role must be one of: ${Object.values(UserRole).join(", ")}`,
    "any.required": "Role is required",
  }),
});

export const loginUserSchema = Joi.object({
  email: Joi.string().trim().lowercase().email().required().messages({
    "string.empty": "Email is required",
    "string.email": "Invalid email format",
  }),
  password: Joi.string().min(6).max(20).required().trim().messages({
    "string.empty": "Password is required",
    "string.min": "Incorrect Password",
    "string.max": "Incorrect Password",
  })
});

