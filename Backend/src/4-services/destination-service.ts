import { OkPacketParams } from 'mysql2';
import { dal } from '../2-utils/dal';
import { ResourceNotFoundError, ValidationError } from '../3-models/client-error';
import { DestinationModel } from '../3-models/destination-model';
import { fileSaver } from 'uploaded-file-saver';
import { cyber } from '../2-utils/cyber';
import { UserModel } from '../3-models/user-model';

// Destination service - any logic regarding destinations:
class DestinationService {
  // Get all destinations:
  public async getAllDestinations(userId: number) {
    console.log('userId: ', userId);
    const sql = `
            SELECT DISTINCT
                V.*, 
                imageName,
                EXISTS(SELECT * FROM likes WHERE id = L.destinationId AND userId = ?) AS isLiked,
                COUNT(L.userId) AS likesCount
            FROM destinations as V LEFT JOIN likes as L
            ON V.id = L.destinationId
            GROUP BY id
            ORDER BY fromDate, untilDate
            `;

    // Execute:
    const destinations = await dal.execute(sql, [userId]);

    // Return:
    return destinations;
  }

  // Get one destination:
  public async getOneDestination(id: number) {
    // SQL:
    const sql = `SELECT *, 
                    imageName
                    FROM destinations 
                    WHERE id = ?
                    `;

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
    console.log('debug', error);
    if (error) throw new ValidationError(error);

    // Save image to disk:
    const imageName = destination.image ? await fileSaver.add(destination.image) : null;

    // SQL:
    const sql = `
            INSERT INTO destinations 
            values(default,?,?,?,?,?,?);
            `;

    // Execute:
    const info: OkPacketParams = await dal.execute(sql, [destination.destination, destination.description, parseDate(destination.fromDate), parseDate(destination.untilDate), destination.price, imageName]);

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
    const sql = 'update destinations set destination = ?, description = ?, fromDate = ?, untilDate = ?, price = ? where id = ?';

    // Execute:
    const info: OkPacketParams = await dal.execute(sql, [destination.destination, destination.description, parseDate(destination.fromDate), parseDate(destination.untilDate), destination.id]);

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

  private async addLike(like: { destinationId: number; userId: number }): Promise<any> {
    //Validate:
    if (!like.destinationId || !like.userId) {
      throw new Error('Destination ID and User ID are required');
    }

    // SQL:
    const sql = `
            
            INSERT INTO likes (destinationId, userId)
            values(?,?)
            `;

    // Execute:
    let info: OkPacketParams;
    try {
      info = await dal.execute(sql, [like.destinationId, like.userId]);
    } catch (err) {
      throw new Error('Failed to add like: ' + err.message);
    }
  }

  private async deleteLike(like: { destinationId: number; userId: number }): Promise<any> {
    //Validate:
    if (!like.destinationId || !like.userId) {
      throw new Error('Destination ID and User ID are required');
    }

    // SQL:
    const sql = `  
            DELETE  FROM likes
            WHERE destinationId = ? AND userId = ?;
            `;

    // Execute:
    let info: OkPacketParams;
    try {
      info = await dal.execute(sql, [like.destinationId, like.userId]);
    } catch (err) {
      throw new Error('Failed to delete like: ' + err.message);
    }
  }

  private async checkLike(like: { destinationId: number; userId: number }): Promise<any> {
    //Validate:
    if (!like.destinationId || !like.userId) {
      throw new Error('Destination ID and User ID are required');
    }

    // SQL:
    const sql = ` 
            SELECT * 
            FROM likes
            WHERE destinationId = ? AND userId = ?;
            `;

    // Execute:
    let info: string | any[];
    try {
      info = await dal.execute(sql, [like.destinationId, like.userId]);
    } catch (err) {
      throw new Error('Failed to delete like: ' + err.message);
    }
    if (info.length === 0) {
      return false;
    } else {
      return true;
    }
  }

  public async changeLike(destinationId: number, user: UserModel): Promise<any> {

    const userId = user.id;

    //Validate:
    if (!destinationId || !userId) {
      throw new Error('Destination ID and User ID are required');
    }

    if (user.roleId === 1) {
         throw new Error('Admin not allowed to Like destination');
    }

    const isLike = await this.checkLike({ destinationId: destinationId, userId: userId });
    if (isLike === false) {
      await this.addLike({ destinationId: destinationId, userId: userId });
    } else {
      await this.deleteLike({ destinationId: destinationId, userId: userId });
    }
    return !isLike;
  }
}

function parseDate(dateStr: string): string {
  const date = new Date(dateStr);
  // Ensure the format is compatible with your database, typically `YYYY-MM-DD`
  return date.toISOString().split('T')[0]; // Formats to `YYYY-MM-DD`
}

export const destinationService = new DestinationService();
