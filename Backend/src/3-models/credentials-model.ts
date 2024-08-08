import Joi from "joi";

import joi from 'joi';
import { joiPasswordExtendCore } from 'joi-password';
const joiPassword = joi.extend(joiPasswordExtendCore);

export class CredentialsModel {
  public email: string;
  public password: string;

  public constructor(user: CredentialsModel) {
    this.email = user.email;
    this.password = user.password;
  }

  private static validationSchema = Joi.object({
    email: Joi.string().required(), //.email({minDomainSegments: 2,tlds: { allow: ['com', 'net', 'inter'] }, }),
    password: joiPassword.string().required().min(4).max(100).noWhiteSpaces().doesNotInclude(['password']),
  });

  public validate(): string {
    const result = CredentialsModel.validationSchema.validate(this);
    return result.error?.message;
  }
}