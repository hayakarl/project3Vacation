import { NavLink, useNavigate, useParams } from "react-router-dom";
import "./DestinationDetails.css";
import { DestinationModel } from "../../../Models/DestinationModel";
import { useEffect, useState } from "react";
import { destinationService } from "../../../Services/DestinationService";
import { notify } from "../../../Utils/notify";
import notifyService from "../../../Services/NotifyService";

export function DestinationDetails(): JSX.Element {
    
  // Getting all route parameters:
  const params = useParams();

  // Navigate method:
  const navigate = useNavigate();

  // State for the single destination:
  const [destination, setDestination] = useState<DestinationModel>();

  useEffect(() => {

    // Getting destination id from the route:
    const id = +params.destinationId;

    destinationService.getOneDestination(id)
      .then(destination => setDestination(destination))
      .catch((err) => notify.error(err));
  }, []);

     async function deleteDestination() {
       try {
         const iAmSure = window.confirm(
           'Are you sure you want to delete this destination?');
         if (!iAmSure) return;

         await destinationService.deleteDestination(destination.id);
         notifyService.success('Destination has been deleted');
         navigate('/destination');
       } catch (err: any) {
         notifyService.error(err);
       }
     }


  return (
    <div className="DestinationDetails">
      {destination && (
        <>
          <h3>יעד : {destination.destination}</h3>
          <h3>{destination.description}</h3>

           {destination.fromDate}🔛 {destination.untilDate}
        
          <h3>מחיר : {destination.price}</h3>
          <img src={destination.imageUrl} />
          <br />
          <br />
          <NavLink to="/destination">Back</NavLink>
          <span> | </span>
          <NavLink to={'/destinations/edit/' + destination.id}>Edit</NavLink>
          <span> | </span>
          <NavLink to="" onClick={deleteDestination}>Delete</NavLink>
        </>
      )}
    </div>
  );
}
