import axios from 'axios';
import { UserModel } from '../Models/UserModel';
import { appConfig } from '../Utils/AppConfig';
import { store, userActions } from '../Redux/store';
import { jwtDecode } from 'jwt-decode'; // npm i jwt-decode
import { CredentialsModel } from '../Models/CredentialsModel';
// import { initUser } from '../Redux/reducers';

class UserService {
    
    //token if user refresh page
  public constructor() {
    const token = localStorage.getItem('token');
    if (!token) return;
    const container = jwtDecode<{ user: UserModel }>(token);
    const dbUser = container.user;
    const action = userActions.initUser(dbUser);
    store.dispatch(action);
  }

  public async register(user: UserModel) {
    // Send user to backend:
    const response = await axios.post<string>(appConfig.backendUrl + "register", user);

    // Get token:
    const token = response.data;

    // Save token to storage:
    localStorage.setItem('token', token);

    // Extract db user from token:
    const container = jwtDecode<{ user: UserModel }>(token);
    const dbUser = container.user;

    // Send to redux:
    const action = userActions.initUser(dbUser);
    store.dispatch(action);
  }

  public async login(credentials: CredentialsModel) {
    
    // Send credentials to backend:
    const response = await axios.post<string>(appConfig.backendUrl + "login", credentials);

    // Get token:
    const token = response.data;

    // Save token to storage:
    localStorage.setItem('token', token);

    // Extract db user from token:
    const container = jwtDecode<{ user: UserModel }>(token);
    const dbUser = container.user;

    // Send to redux:
    const action = userActions.initUser(dbUser);
    store.dispatch(action);
  }

  public logout() {
    localStorage.removeItem('token');
    const action = userActions.logoutUser();
    store.dispatch(action);
  }
//check if user admin
    public isAdmin(user: UserModel = null): boolean {
        if (!user) { //if no user
            user = store.getState().user;
            if (!user) return false;
        }
        return user.roleId === 1;
    }
}

export const userService = new UserService();
