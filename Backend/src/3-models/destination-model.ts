import { UploadedFile } from 'express-fileupload';
import Joi from 'joi';

export class DestinationModel {
  public id: number;
  public destination: string;
  public description: string;
  public fromDate: string;
  public untilDate: string;
  public price: number;
  public image: UploadedFile; // Image bytes sent from frontend.
  public likesCount: number;
  public isLiked: boolean;

  // Copy Constructor
  public constructor(destination: DestinationModel) {
    this.id = destination.id;
    this.destination = destination.destination;
    this.description = destination.description;
    this.fromDate = destination.fromDate;
    this.untilDate = destination.untilDate;
    this.price = destination.price;
    this.image = destination.image;
    this.likesCount = destination.likesCount;
    this.isLiked = destination.isLiked;
  }

  private static validationScheme = Joi.object({
    id: Joi.number().optional().positive().integer(),
    destination: Joi.string().required().min(3).max(50),
    description: Joi.string().required().min(5).max(1000),
    price: Joi.number().required().positive().min(90).max(10000),
    fromDate: Joi.string().required(),
    untilDate: Joi.string().required(),
    image: Joi.object().required(),
    // likesCount: Joi.number().integer().min(0).optional(),
    // isLiked: Joi.boolean().optional()
  }); /*.custom((value, helpers) => {
    const { fromDate, untilDate } = value;

    // Convert dates to comparable format (ISO string or Unix timestamp)
    const from = new Date(fromDate);
    const until = new Date(untilDate);
    const now = new Date();

    // Check if dates are valid and not in the past
    if (until < from) {
      return helpers.error('any.invalid');
    }
    if (from < now || until < now) {
        return helpers.error('any.invalid');
    }

    return value;
  }, 'Date Validation');*/

  public validate(): string {
    const result = DestinationModel.validationScheme.validate(this);
    return result.error?.message;
  }
}
