import { DestinationModel } from '../../../Models/DestinationModel';
import { destinationService } from '../../../Services/DestinationService';
import './DestinationCard.css';
import { userService } from '../../../Services/UserService';
import notifyService from '../../../Services/NotifyService';
import { NavLink } from 'react-router-dom';
import { appConfig } from '../../../Utils/AppConfig';

type DestinationCardProps = {
  destination: DestinationModel;
  onDelete: (id: number) => void;
  onLike: (id: number, isLiked: boolean) => void;
};

export function DestinationCard(props: DestinationCardProps): JSX.Element {
  const onDelete = props.onDelete;
  const onLike = props.onLike;

  async function changeLike() {
    try {
      onLike(props.destination.id, Boolean(props.destination.isLiked));
      await destinationService.changeLike(props.destination.id);
    } catch (err: any) {
      notifyService.error(err);
    }
  }

  return (
    <div className="DestinationCard">
      <div className="information">
        <div className="destination-name">
          <span>{props.destination.destination}</span>
        </div>

        <div>
          {!userService.isAdmin() && (
            <>
              <span className="Cursor" onClick={changeLike}>
                {' '}
                {props.destination.isLiked == 1 ? 'like❤️' : 'unlike🩶'}{' '}
              </span>{' '}
              ||
            </>
          )}
          <span>💞 {props.destination.likesCount}</span>
        </div>

        <div>
          {userService.isAdmin() ? (
            <NavLink to={'/destinations/details/' + props.destination.id}>
              <img src={appConfig.backendUrl + 'destinations/images/' + props.destination.imageName} alt={props.destination.destination} />
            </NavLink>
          ) : (
            <img src={appConfig.backendUrl + 'destinations/images/' + props.destination.imageName} alt={props.destination.destination} />
          )}
        </div>

        <div className="destinationDescription">
          <span>{props.destination.description}</span>
        </div>

        <div>
          <span>מחיר :$ {Number(props.destination.price).toLocaleString()}</span>
        </div>

        <div className="dates">
          <p>
            <b> {new Date(props.destination.fromDate).toLocaleDateString()}</b>
            🔛
            <b>{new Date(props.destination.untilDate).toLocaleDateString()}</b>
          </p>
        </div>

        <div>
          {userService.isAdmin() && (
            <>
              <a className="Button" href="#" onClick={() => onDelete(props.destination.id)}>
                מחיקה
              </a>

              <NavLink className="Button" to={'/destinations/edit/' + props.destination.id}>
                עריכה
              </NavLink>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
