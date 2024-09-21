import { NavLink, useNavigate, useParams } from 'react-router-dom';
import './DestinationDetails.css';
import { DestinationModel } from '../../../Models/DestinationModel';
import { useEffect, useState } from 'react';
import { destinationService } from '../../../Services/DestinationService';
import { notify } from '../../../Utils/notify';
import notifyService from '../../../Services/NotifyService';
import { appConfig } from '../../../Utils/AppConfig';

export function DestinationDetails(): JSX.Element {
  // Getting all route parameters:
  const params = useParams();

  const navigate = useNavigate();

  // State for the single destination:
  const [destination, setDestination] = useState<DestinationModel>();

  useEffect(() => {
    // Getting destination id from the route:
    const id = +params.destinationId;

    destinationService
      .getOneDestination(id)
      .then((destination) => setDestination(destination))
      .catch((err) => notify.error(err));
  }, [params.destinationId]);

  async function deleteDestination() {
    try {
      const iAmSure = window.confirm('האם את.אתה בטוח שמעוניין למחוק');
      if (!iAmSure) return;

      await destinationService.deleteDestination(destination.id);
      notifyService.success('היעד נמחק');
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
          {new Date(destination.fromDate).toLocaleDateString()} 🔛 {new Date(destination.untilDate).toLocaleDateString()}
          <h3>
            מחיר :
            <span className="price">
              $
              {Number(destination.price)
                .toFixed(0)
                .replace(/\B(?=(\d{3})+(?!\d))/g, '')}
            </span>
          </h3>
          <img src={appConfig.backendUrl + 'destinations/images/' + destination.imageName} />
          alt={destination.description || 'תמונת יעד'}
          <br />
          <br />
          <NavLink to="/destination">Back</NavLink>
          <span> | </span>
          <NavLink to={'/destinations/edit/' + destination.id}>Edit</NavLink>
          <span> | </span>
          <NavLink to="" onClick={deleteDestination}>
            Delete
          </NavLink>
        </>
      )}
    </div>
  );
}
