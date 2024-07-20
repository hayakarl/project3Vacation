import {  NavLink, useActionData, useNavigate, useParams } from 'react-router-dom';
import { DestinationModel } from '../../../Models/DestinationModel';
import { destinationService } from '../../../Services/DestinationService';
import './DestinationCard.css';
import { useEffect, useState } from 'react';
import { userService } from '../../../Services/UserService';
import notifyService from '../../../Services/NotifyService';
import { userActions } from '../../../Redux/store';
import { Role } from '../../../Models/enums';
import { Admin } from '@rsuite/icons';
import { jwtDecode, JwtPayload } from 'jwt-decode';

type DestinationCardProps = {
    destination: DestinationModel;
};


export function DestinationCard(props: DestinationCardProps): JSX.Element {
    const [destination, setDestination] = useState<DestinationModel>();

    //delete button
async function deleteDestination() { 
    //   const [destination, setDestination] = useState<DestinationModel>();

    try {
      const iAmShure = window.confirm(`Are you sure you want to delete this destination?`);
      if (!iAmShure) return;

      await destinationService.deleteDestination(destination.id);  
      notifyService.success('Destination has been deleted');
        // navigate('/destination');
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

        <div> //hide admin
            <br />
            <span>Like : yes/no </span> ||
            <span>מספר Likes : x</span>
        </div>

        <div>
          <NavLink to={'/destinations/details/' + props.destination.id}>
            <img src={props.destination.imageUrl} />
          </NavLink>
        </div>

        <div>
          <span>{props.destination.description}</span>
          <br />
        </div>
        
        <div>   
          <span>מחיר :$ {props.destination.price} </span>
        </div>

        <div className="dates">
          <p>
            <b> {props.destination.fromDate.toLocaleDateString()}</b>
            🔛 <b>{props.destination.untilDate.toLocaleDateString()}</b>
          </p>
        </div>

        <div>
          {userService.isAdmin() && <>
             <button onClick={deleteDestination}>Delete</button>

             <span> | </span>
             <NavLink to={'/destinations/edit/' + props.destination.id}>Edit</NavLink>
            </>}
        </div>
        
    </div>

</div>

  );
}
