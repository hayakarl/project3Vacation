import { UserMenu } from '../../UserArea/UserMenu/UserMenu';
import './Header.css';

export function Header(): JSX.Element {
  return (
    <div className="Header">
      <UserMenu isLeft={false} />
      <h1>לרכוב בחו"ל 🚴‍♂️🚴🎯 </h1>
      <UserMenu isLeft={true} />
    </div>
  );
}
