import express, { Request, Response, NextFunction } from 'express';
import { destinationService } from '../4-services/destination-service';
import { DestinationModel } from '../3-models/destination-model';
import { StatusCode } from '../3-models/enums';
import { securityMiddleware } from '../6-middleware/security-middleware';
import { fileSaver } from 'uploaded-file-saver';
import { UserModel } from '../3-models/user-model';

// Destination controller - listening to destination requests:
class DestinationController {

  // Creating a router object:
  public readonly router = express.Router();

  // Register routes:
  public constructor() {
    this.router.get('/destinations', securityMiddleware.validateLogin, this.getAllDestinations);
    this.router.get('/destinations/:id([0-9]+)', this.getOneDestination);
    this.router.post('/destinations',securityMiddleware.validateAdmin, this.addDestination);
    this.router.put('/destinations/:id([0-9]+)',securityMiddleware.validateAdmin,this.updateDestination);
    this.router.delete('/destinations/:id([0-9]+)',securityMiddleware.validateAdmin, this.deleteDestination);
    this.router.get('/destinations/images/:imageName', this.getDestinationImage);
  }

  // Get all destinations:
  private async getAllDestinations(request: Request, response: Response, next: NextFunction) {
    const userId = response.locals.tokenData.user.id

    try {
      const destinations = await destinationService.getAllDestinations(userId);
      response.json(destinations);
    } 
    catch (err: any) {
      next(err); // Go to catchAll middleware!
    }
  }

  // Get one destination:
  private async getOneDestination(request: Request, response: Response, next: NextFunction) {
    try {
      const id = +request.params.id;
      const destination = await destinationService.getOneDestination(id);
      response.json(destination);
    } 
    catch (err: any) {
      next(err);
    }
  }

  // Add destination:
  private async addDestination(request: Request, response: Response, next: NextFunction) {
    try {
    //   Handle file upload
      const image = request.files?.image;
       
      const reqParams = {...request.body, image: image}
      const destination = new DestinationModel(reqParams); //give me the destination
      const addedDestination = await destinationService.addDestination(destination);
      response.status(StatusCode.Created).json(addedDestination);
    } 
    catch (err: any) {
      next(err);
    }
  }

  // Update destination:
  private async updateDestination(request: Request, response: Response, next: NextFunction) {
    try {
      const id = +request.params.id;

      request.body.id = id; //add id to the body

      const destination = new DestinationModel(request.body);
  
      const updatedDestination = await destinationService.updateDestination(destination);
      response.json(updatedDestination);
    } 
    catch (err: any) {
      next(err);
    }
  }

  // Delete destination:
  private async deleteDestination(request: Request, response: Response, next: NextFunction) {
    try {
      const id = +request.params.id;
      await destinationService.deleteDestination(id);
      response.sendStatus(StatusCode.NoContent);
    }
    catch (err: any) {
      next(err);
    }
  }
// Get destination image: get name of picture and return file of the picture
    private async getDestinationImage(request: Request, response: Response, next: NextFunction) {
        try {
            const imageName = request.params.imageName;
            const imagePath = fileSaver.getFilePath(imageName, true);
            response.sendFile(imagePath);
        }
        catch (err: any) {
            next(err);
        }
    }
}

export const destinationController = new DestinationController();
