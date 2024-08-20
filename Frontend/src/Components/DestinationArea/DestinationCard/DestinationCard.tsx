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
  onLike: (id: number, isLiked: boolean) => void;

};

export function DestinationCard(props: DestinationCardProps): JSX.Element {
  
  const onDelete = props.onDelete;
  const onLike = props.onLike
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
        <div>
          <span>{props.destination.destination}</span> 
        </div>

        <div>
          {!userService.isAdmin() && (
            <>
              <span onClick={changeLike}> {props.destination.isLiked == 1 ? 'like❤️' : 'unlike🩶'} </span> ||
            </>
          )}
          <span>💞 {props.destination.likesCount}</span>
        </div>

        <div>
          <NavLink to={'/destinations/details/' + props.destination.id}>
            <img src={appConfig.backendUrl + 'destinations/images/' + props.destination.imageName} />
          </NavLink>
        </div>

        <div>
          <br />
          <span>{props.destination.description}</span>
          <br />
          <br />
        </div>

        <div>
          <span>מחיר :$ {props.destination.price} </span>
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
              <button onClick={() => onDelete(props.destination.id)}>Delete</button>

              <span> | </span>
              <NavLink to={'/destinations/edit/' + props.destination.id}>Edit</NavLink>
              <span> | </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
