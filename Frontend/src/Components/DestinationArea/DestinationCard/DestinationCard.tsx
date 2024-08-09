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
    const [destination, setDestination] = useState<DestinationModel>();
    const navigate = useNavigate();

    // //like button
    // async function buttonLike(ev: any, DId: number) {
    //     try {
    //          const action = ev.target.classList;
    //         if (action[0] === "disLike") {
    //             await destinationService.dislike(DId);
    //             ev.target.className = "follow";
    //             return;
    //         }
    //         if (action[0] === "like") {
    //             await destinationService.like(DId);
    //             ev.target.className = "unFollow";
    //             return;
    //         }
    //     }
    //     catch (err: any) {
    //         notifyService.error(err);
    //     }
    // }

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
          <span>{props.destination.destination}</span>
        </div>

        <div> 
            <br />
            {/* <button
              className = {props.destination.isLiked ? "not like" : "❤️"}
              disabled = {userService.isAdmin()}
              onClick = {(ev) => buttonLike(ev, destination.id)}>
              {destination.likesCount}

            </button> */}
            <span>Like : {props.destination.isLiked} </span> ||
            <span>מספר Likes : {props.destination.likesCount}</span>
        </div>

        <div>
          <NavLink to={'/destinations/details/' + props.destination.id}>
            <img src={appConfig.backendUrl + 'destinations/images/' + props.destination.imageName} />
          </NavLink>
        </div>

        <div> 
           <br/>
          <span>{props.destination.description}</span>
          <br /><br />
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
          {userService.isAdmin() && <>
             <button onClick={() => deleteDestination(props.destination.id)}>Delete</button>

             <span> | </span>
             <NavLink to={'/destinations/edit/' + props.destination.id}>Edit</NavLink>
            </>}
        </div>
        
    </div>

</div>

  );
}
