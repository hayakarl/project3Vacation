import { OkPacketParams } from 'mysql2';
import { dal } from '../2-utils/dal';
import { UserModel } from '../3-models/user-model';
import { Role } from '../3-models/enums';
import { cyber } from '../2-utils/cyber';
import { CredentialsModel } from '../3-models/credentials-model';
import { UnauthorizedError, ValidationError } from '../3-models/client-error';

// Deals with users:
class UserService {
    
  // Register new user:
  public async register(user: UserModel) {

    //validation
    const error = user.validate();
    if (error) throw new ValidationError(error);

    // SQL:
    const sql = 'insert into users values(default,?,?,?,?,?)';

    // Set role as regular user and not something else:
    user.roleId = Role.User;

    // Values:
    const values = [user.firstName, user.lastName, user.email, user.password, user.roleId];  

    // Execute:
    const info: OkPacketParams = await dal.execute(sql, values);

    // Set back id:
    user.id = info.insertId;

    // Create JWT (Json Web Token):
    const token = cyber.generateNewToken(user);

    // Return:
    return token;
  }
  
  public async login(credentials: CredentialsModel) {

    //validation
    const error = credentials.validate();
    if (error) throw new ValidationError(error);

    // SQL:
    const sql = 'select * from users where email = ? and password = ?';

    // Values:
    const values = [credentials.email, credentials.password];

    // Execute:
    const users = await dal.execute(sql, values);

    // Extract user:
    const user = users[0];

    // If no user:
    if (!user) throw new UnauthorizedError('Incorrect email or password.');

    // Create JWT (Json Web Token):
    const token = cyber.generateNewToken(user);

    // Return:
    return token;
  }
}

export const userService = new UserService();
