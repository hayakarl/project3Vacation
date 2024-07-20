import { UploadedFile } from 'express-fileupload';
import Joi from 'joi';

export class DestinationModel {
  public id: number;
  public destination: string;
  public description: string;
  public fromDate: Date;
  public untilDate: Date;
  public price: number;
  public image: UploadedFile; // Image bytes sent from frontend.
  public likesCount: number;
  public isLike: boolean; 

  // Copy Constructor
  public constructor(destination: DestinationModel) {
    this.id = destination.id;
    this.destination = destination.destination;
    this.description = destination.description;
    this.fromDate = destination.fromDate;
    this.untilDate = destination.untilDate;
    this.price = destination.price;
    this.image = destination.image;
 //   this.likesCount = destination.likesCount;
  //  this.isLike = destination.isLike;
  }

 private static validationScheme = Joi.object({
        id: Joi.number().optional().positive().integer(),
        destination: Joi.string().required().min(5).max(50),
        description: Joi.string().required().min(5).max(150),
        price: Joi.number().required().positive().min(0).max(10000),
        fromDate: Joi.date().required(),
        untilDate: Joi.date().required(),
        image: Joi.object().optional()
  //      followerCount: Joi.number().integer().min(0).optional(),
 //       isFollow: Joi.boolean().optional()
        
    });

    public validate(): string {
        const result = DestinationModel.validationScheme.validate(this);
        return result.error?.message;

}
}