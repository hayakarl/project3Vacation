import { UploadedFile } from 'express-fileupload';
import Joi from 'joi';

export class DestinationModel {
  public id?: number;
  public destination: string;
  public description: string;
  public fromDate: string;
  public untilDate: string;
  public price: number;
  public image: UploadedFile; // Image bytes sent from frontend.
  public likesCount?: number;
  public isLiked?: boolean;

  public constructor(destination: DestinationModel) {
    this.destination = destination.destination;
    this.description = destination.description;
    this.fromDate = destination.fromDate;
    this.untilDate = destination.untilDate;
    this.price = destination.price;
    this.image = destination.image;
    if (destination.id) {
      this.id = destination.id;
    }
    if (destination.likesCount) {
      this.likesCount = destination.likesCount;
    }
    if (destination.isLiked) {
      this.isLiked = destination.isLiked;
    }
  }

  private static joiBase = {
    id: Joi.number().optional().positive().integer(),
    destination: Joi.string().required().min(3).max(50),
    description: Joi.string().required().min(5).max(1000),
    price: Joi.number().required().positive().min(90).max(10000),
    fromDate: Joi.string().required(),
    untilDate: Joi.string().required(),
  };

  private static validationScheme = Joi.object({
    ...this.joiBase,
    image: Joi.object().required(),
  });

  private static validationSchemeUpdate = Joi.object({
    ...this.joiBase,
    image: Joi.object(),
  });

  public validateUpdate(): string {
    const result = DestinationModel.validationSchemeUpdate.validate(this);
    return result.error?.message;
  }

  public validate(): string {
    const result = DestinationModel.validationScheme.validate(this);
    return result.error?.message;
  }
}
