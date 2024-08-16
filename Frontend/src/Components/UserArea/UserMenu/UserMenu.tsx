import { useSelector } from 'react-redux';
import './UserMenu.css';
import { UserModel } from '../../../Models/UserModel';
import { NavLink } from 'react-router-dom';
import { userService } from '../../../Services/UserService';
import { notify } from '../../../Utils/notify';
import { useState } from 'react';

export function UserMenu(): JSX.Element {
    const userData: UserModel = userService.getUserData() ;
    const [user, setUser] = useState<UserModel | null >(userData);
 

  function logout() {
    userService.logout();
    setUser(null);
    notify.success('We want to thank you for your visit, hope to see you soon');
  }

  return (
    <div className="UserMenu">
      {!user && (
        <>
          <span>Hello Guest || </span>
          <NavLink to="/register">Register</NavLink>
          <span> | </span>
          <NavLink to="/login">Login</NavLink>
        </>
      )}

      {user && (
        <>
          <span>
            Hello {user.firstName} {user.lastName} ||{' '}
          </span>
          <NavLink to="/home" onClick={logout}>
            Logout
          </NavLink>
        </>
      )}
    </div>
  );
}
