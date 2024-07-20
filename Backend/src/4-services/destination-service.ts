import { OkPacketParams } from 'mysql2';
import { dal } from '../2-utils/dal';
import { ResourceNotFoundError, ValidationError } from '../3-models/client-error';
import { DestinationModel } from '../3-models/destination-model';
import { fileSaver } from 'uploaded-file-saver';

// Destination service - any logic regarding destinations:
class DestinationService {

  // Get all destinations:
  public async getAllDestinations() {
    // Create sql:
    const sql = "select *, concat('http://localhost:4000/api/destinations/images/', imageName) as imageUrl from Destinations";

    // Execute:
    const destinations = await dal.execute(sql);

    // Return:
    return destinations;
  }

  // Get one destination:
  public async getOneDestination(id: number) {
    // SQL:
    const sql = "select *, concat('http://localhost:4000/api/destinations/images/', imageName) as imageUrl from destinations where id = ?";

    // Execute:
    const destinations = await dal.execute(sql, [id]);

    // Extract the one and only destination:
    const destination = destinations[0];

    // If destination not found:
    if (!destination) throw new ResourceNotFoundError(id);

    // Return:
    return destination;
  }

  // Add destination:
  public async addDestination(destination: DestinationModel) {

    //Validate:
    const error = destination.validate();
    if (error) throw new ValidationError(error);

    // Save image to disk:
    const imageName = destination.image ? await fileSaver.add(destination.image): null;

    // SQL:
    const sql = 'insert into destinations values(default,?,?,?,?,?,?)';

    // Execute:
    const info: OkPacketParams = await dal.execute(sql, [
      destination.destination,
      destination.description,
      destination.fromDate, 
      destination.untilDate,
      destination.price,
      imageName,
    ]);

    // Get back the db destination:
    destination = await this.getOneDestination(info.insertId);

    // Return:
    return destination;
  }

  // Update destination:
  public async updateDestination(destination: DestinationModel) { 
    
    //validation
   const error = destination.validate();
   if (error) throw new ValidationError(error);

    // SQL:
    const sql = 'update destinations set destination = ?, description = ?, fromDate = ?, untilDate = ?, price = ?, where id = ?';

    // Execute:
    const info: OkPacketParams = await dal.execute(sql, [
      destination.destination,
      destination.description,
      parseDate(destination.fromDate),
      parseDate(destination.untilDate),
      destination.id,
    ]);

    // If destination not found:
    if (info.affectedRows === 0) throw new ResourceNotFoundError(destination.id);

    // Return:
    return destination;
  }

  // Delete destination:
  public async deleteDestination(id: number) {
    
    // SQL:
    const sql = 'delete from destinations where id = ?';

    // Execute:
    const info: OkPacketParams = await dal.execute(sql, [id]);

    // If destination not found:
    if (info.affectedRows === 0) throw new ResourceNotFoundError(id);
  }
}

 function parseDate(d: Date): string {
   return `${d.getFullYear()}-${d.getMonth()}- ${d.getDate()}`;
 }

export const destinationService = new DestinationService();
