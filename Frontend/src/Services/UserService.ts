import axios from 'axios';
import { UserModel } from '../Models/UserModel';
import { appConfig } from '../Utils/AppConfig';
import { jwtDecode } from 'jwt-decode'; // npm i jwt-decode
import { CredentialsModel } from '../Models/CredentialsModel';
import { Token } from '@mui/icons-material';
// import { initUser } from '../Redux/reducers';

class UserService {
  //token if user refresh page
  public constructor() {
    const token = localStorage.getItem('token');
    if (!token) return;
    const container = jwtDecode<{ user: UserModel }>(token);
    const dbUser = container.user;
  }

  public async register(user: UserModel) {
    // Send user to backend:
    const response = await axios.post<string>(appConfig.backendUrl + 'register', user);

    // Get token:
    const token = response.data;

    // Save token to storage:
    localStorage.setItem('token', token);

    // Extract db user from token:
    const container = jwtDecode<{ user: UserModel }>(token);
    const dbUser = container.user;
  }

  public async login(credentials: CredentialsModel) {
    // Send credentials to backend:
    const response = await axios.post<string>(appConfig.backendUrl + 'login', credentials);

    // Get token:
    const token = response.data;

    // Save token to storage:
    localStorage.setItem('token', token);

    // Extract db user from token:
    const container = jwtDecode<{ user: UserModel }>(token);
    const dbUser = container.user;
  }

  public getUserData() {
    const token = localStorage.getItem('token');

    if (token === null) {
      return null;
    }

    // Extract db user from token:
    const container = jwtDecode<{ user: UserModel }>(token);
    return container.user;
  }

  public logout() {
    localStorage.removeItem('token');
  }
  //check if user admin
  public isAdmin(): boolean {
    const user = this.getUserData();
    if (user === null) {
      return false;
    }
    return user.roleId === 1;
  }
}

export const userService = new UserService();
