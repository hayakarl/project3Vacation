import { useSelector } from 'react-redux';
import './UserMenu.css';
import { UserModel } from '../../../Models/UserModel';
import { NavLink } from 'react-router-dom';
import { userService } from '../../../Services/UserService';
import { notify } from '../../../Utils/notify';
import { useState } from 'react';

export function UserMenu(): JSX.Element {
  const userData: UserModel = userService.getUserData();
  const [user, setUser] = useState<UserModel | null>(userData);

  function logout() {
    userService.logout();
    window.location.href = '/home';
    setUser(null);
    notify.success('תודה שבקרת באתר שלנו, נשמח לראותך שוב');
  }

  return (
    <div className="UserMenu">
      {!user && (
        <>
          <span>שלום אורח | </span>
          <NavLink to="/register">הרשמה</NavLink>
          <span> | </span>
          <NavLink to="/login">כניסה</NavLink>
        </>
      )}

      {user && (
        <>
          <span>
            היי {user.firstName} {user.lastName}
          </span>

          <NavLink to="/home" onClick={logout}>
            התנתקות
          </NavLink>
        </>
      )}
    </div>
  );
}
