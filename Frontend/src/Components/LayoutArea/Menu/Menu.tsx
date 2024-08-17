import { NavLink } from 'react-router-dom';
import './Menu.css';

export function Menu(): JSX.Element {
  return (
    <div className="Menu">
      <NavLink to="/home">ראשי 🛫</NavLink>
      <NavLink to="/destination">חופשות רכיבה🚲</NavLink>
      <NavLink to="/about">צור קשר🧙</NavLink>
    
    </div>
  );
}
