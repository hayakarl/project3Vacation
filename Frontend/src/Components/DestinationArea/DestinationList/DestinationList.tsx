import { useEffect, useState } from "react";
import { DestinationModel } from "../../../Models/DestinationModel";
import { destinationService } from "../../../Services/DestinationService";
import "./DestinationList.css";
import { DestinationCard } from "../DestinationCard/DestinationCard";
import { notify } from "../../../Utils/notify";
import { errorHandler } from "../../../Utils/ErrorHandler";
import { NavLink, useParams } from "react-router-dom";
import { FormControlLabel, FormGroup } from "@mui/material";
import Checkbox from '@mui/material/Checkbox';

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';


export function DestinationList(): JSX.Element {
    
  // Getting all route parameters:
  const params = useParams();

//   const navigate = useNavigate();  

  const [destinations, setDestinations] = useState<DestinationModel[]>([]);
  const [destination, setDestination] = useState<DestinationModel>();

  useEffect(() => {
    destinationService.getAllDestinations()
      .then((destinations) => setDestinations(destinations))
      .catch((err) => notify.error(errorHandler.getError(err)));
  }, []);

  useEffect(() => {
    // Getting destination id from the route:
    const id = +params.destinationId;

    destinationService.getOneDestination(id)
      .then((destination) => setDestination(destination))
      .catch((err) => notify.error(err));
  }, []);

  return (
    <div className="DestinationList">
      <div>
        <FormGroup className="filter">
          <FormControlLabel control={<Checkbox defaultChecked />} label="כל החופשות" />
          <FormControlLabel control={<Checkbox />} label="חופשות במעקב" />
          <FormControlLabel control={<Checkbox />} label="חופשות פעילות" />
        </FormGroup>
      </div>

      <div>
        <NavLink to="/new-destination"> הוספת חופשה ➕</NavLink>
      </div>

      {destinations.map(p => <DestinationCard key={p.id} destination={p} />)}

      <div className="pagination">
        <Stack spacing={2}>
          <Pagination count={10} color="primary" />
        </Stack>
      </div>
    </div>
  );
}
