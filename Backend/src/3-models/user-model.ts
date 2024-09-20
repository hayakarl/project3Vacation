import Joi from 'joi';
import { Role } from './enums';

export class UserModel {
  public id: number;
  public firstName: string;
  public lastName: string;
  public email: string;
  public password: string;
  public roleId: Role;

  public constructor(user: UserModel) {
    this.id = user.id;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.password = user.password;
    this.roleId = user.roleId;
  }

  private static validationSchema = Joi.object({
    id: Joi.number().optional().positive().integer(),
    firstName: Joi.string().required().min(2).max(100),
    lastName: Joi.string().required().min(2).max(100),
    email: Joi.string().email({ minDomainSegments: 2}),
    password: Joi.string().required().min(4).max(100).pattern(new RegExp('(?=.*[a-z])')), // At least one lowercase letter,
    roleId: Joi.string().optional().min(4).max(100),
  });

  public validate(): string {
    const result = UserModel.validationSchema.validate(this);
    return result.error?.message;
  }
}
