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
};

export function DestinationCard(props: DestinationCardProps): JSX.Element {
  const [destination, setDestination] = useState<DestinationModel>(props.destination);
  const navigate = useNavigate();

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

  //delete button
  async function deleteDestination(id: number) {
    try {
      const iAmShure = window.confirm(`Are you sure you want to delete this destination?`);
      if (!iAmShure) return;

      await destinationService.deleteDestination(id);
      notifyService.success('Destination has been deleted');
      navigate('/destination');
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
          <br />
          <span onClick={changeLike}> {destination.isLiked == 1 ? 'like❤️' : 'unlike🩶'} </span> ||
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
              <button onClick={() => deleteDestination(destination.id)}>Delete</button>

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
