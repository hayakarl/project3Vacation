import { NavLink } from 'react-router-dom';
import './Menu.css';
import { useState } from 'react';
import { UserModel } from '../../../Models/UserModel';
import { userService } from '../../../Services/UserService';

export function Menu(): JSX.Element {
  const userData: UserModel = userService.getUserData();
  const [user] = useState<UserModel | null>(userData);

  return (
    <div className="Menu">
      <NavLink to="/home">ראשי 🛫</NavLink>
      {user && <NavLink to="/destination">חופשות רכיבה🚲</NavLink>}
      <NavLink to="/about">צור קשר🧙</NavLink>
    </div>
  );
}
