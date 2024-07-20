import { useNavigate, useParams } from "react-router-dom";
import { destinationService } from "../../../Services/DestinationService";
import notifyService from "../../../Services/NotifyService";
import "./DeleteDestination.css";
import { useEffect, useState } from "react";
import { DestinationModel } from "../../../Models/DestinationModel";
import { notify } from "../../../Utils/notify";

export function DeleteDestination(destinationId: number): JSX.Element {
 
    // const navigate = useNavigate();
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
      const iAmSure = window.confirm(`Are you sure you want to delete "${destinationId}"?`);
      if (!iAmSure) return;
      await destinationService.deleteDestination(destinationId);  
      notifyService.success('Destination has been deleted');
         navigate('/destination');
       } catch (err: any) {
         notifyService.error(err);
    }
}

    return (
      <div className="DeleteDestination">
            <button onClick={() => {deleteDestination}}>Delete</button> 
      </div>
    );
}
