import { NavLink } from 'react-router-dom';
import './Menu.css';
import { TotalDestinations } from '../../DestinationArea/TotalDestinations/TotalDestinations';

export function Menu(): JSX.Element {
  return (
    <div className="Menu">
      <NavLink to="/home">ראשי 🛫</NavLink>
      <NavLink to="/destination">חופשות רכיבה🚲</NavLink>
      {/* <NavLink to="/new-destination"> הוסף חופשה   ➕</NavLink> */}
      {/* <NavLink to="/edit-destination"> עדכן חופשה  🔃</NavLink> */}
      <NavLink to="/about">צור קשר🧙</NavLink>

      <TotalDestinations />
    </div>
  );
}
