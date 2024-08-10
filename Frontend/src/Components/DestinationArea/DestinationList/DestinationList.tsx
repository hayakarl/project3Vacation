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
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 9; // Number of items to display per page

  useEffect(() => {
    destinationService.getAllDestinations()
      .then(destinations => {
        if(Array.isArray(destinations)) {
            setDestinations(destinations);
        } else {
            throw new Error("Invalid data format");
        }
    })
      .catch((err) => notify.error(errorHandler.getError(err)));
  }, []);


   // Calculate the destinations to display on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentDestinations = destinations.slice(indexOfFirstItem, indexOfLastItem);

  // Handle page change
  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

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
        <br />
        <NavLink to="/destination/destinationReport"> דוח חופשות 📊</NavLink>
      </div>

      {currentDestinations.map(p => <DestinationCard key={p.id} destination={p} />)}

      <div className="pagination">
        <Stack spacing={2}>
          <Pagination
            count={Math.ceil(destinations.length / itemsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        </Stack>

      </div>
    </div>
  );
}
