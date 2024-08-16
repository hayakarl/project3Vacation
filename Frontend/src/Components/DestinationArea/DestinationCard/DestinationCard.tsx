import { DestinationModel } from '../../../Models/DestinationModel';
import { destinationService } from '../../../Services/DestinationService';
import './DestinationCard.css';
import { useState } from 'react';
import { userService } from '../../../Services/UserService';
import notifyService from '../../../Services/NotifyService';
import { NavLink, useNavigate } from 'react-router-dom';
import { appConfig } from '../../../Utils/AppConfig';

type DestinationCardProps = {
  destination: DestinationModel;
  onDelete: (id: number) => void;
};

export function DestinationCard(props: DestinationCardProps): JSX.Element {
  const [destination, setDestination] = useState<DestinationModel>(props.destination);
  const navigate = useNavigate();
  const onDelete = props.onDelete;
  async function changeLike() {
    try {
      const changedLike = await destinationService.changeLike(props.destination.id);
      console.log('before', destination);
      setDestination({ ...destination, isLiked: changedLike });
      console.log('after', destination);
    } catch (err: any) {
      notifyService.error(err);
    }
  }


  return (
    <div className="DestinationCard">
      <div className="information">
        <div>
          <span>{destination.destination}</span>
        </div>

        <div>
          {!userService.isAdmin() && (
            <>
              <span onClick={changeLike}> {destination.isLiked == 1 ? 'like❤️' : 'unlike🩶'} </span> ||
            </>
          )}
          <span>💞 {destination.likesCount}</span>
        </div>

        <div>
          <NavLink to={'/destinations/details/' + destination.id}>
            <img src={appConfig.backendUrl + 'destinations/images/' + destination.imageName} />
          </NavLink>
        </div>

        <div>
          <br />
          <span>{destination.description}</span>
          <br />
          <br />
        </div>

        <div>
          <span>מחיר :$ {destination.price} </span>
        </div>

        <div className="dates">
          <p>
            <b> {new Date(destination.fromDate).toLocaleDateString()}</b>
            🔛
            <b>{new Date(destination.untilDate).toLocaleDateString()}</b>
          </p>
        </div>

        <div>
          {userService.isAdmin() && (
            <>
              <button onClick={() => onDelete(destination.id)}>Delete</button>

              <span> | </span>
              <NavLink to={'/destinations/edit/' + destination.id}>Edit</NavLink>
              <span> | </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
