import jwt, { SignOptions } from 'jsonwebtoken';
import { UserModel } from '../3-models/user-model';
import { Role } from '../3-models/enums';
import crypto from 'crypto';

class Cyber {
  private secretKey = 'TheBestVacation!';

  private hashingSalt = 'Good Luck';

  public hash(plainText: string): string {
    // Hash with salt:
    return crypto.createHmac('sha512', this.hashingSalt).update(plainText).digest('hex'); // Returns 128 chars string.
  }

  // Generate new JWT token:
  public generateNewToken(user: UserModel): string {
    delete user.password;

    // User container:
    const container = { user };

    // Expires:
    const options: SignOptions = { expiresIn: '6h' };

    // Generate:
    const token = jwt.sign(container, this.secretKey, options);

    // Return:
    return token;
  }

  public isTokenValid(token: string): boolean {
    try {
      if (!token) return false;

      // Verify token:
      jwt.verify(token, this.secretKey);

      // Token valid:
      return true;
    } catch (err: any) {
      // Token not valid
      return false;
    }
  }

  public isAdmin(token: string): boolean {
    try {
      // Extract container object from token:
      const container = jwt.decode(token) as { user: UserModel };

      // Extract user from container:
      const user = container.user;

      // Return true if user is admin, or false if not:
      return user.roleId === Role.Admin;
    } catch (err: any) {
      return false;
    }
  }

  public decodeToken(token: string) {
    try {
      // Extract container object from token:
      const container = jwt.decode(token);

      return container;
    } catch (err: any) {
      return {};
    }
  }
}

export const cyber = new Cyber();
