import { useEffect, useState } from 'react';
import { DestinationModel } from '../../../Models/DestinationModel';
import { destinationService } from '../../../Services/DestinationService';
import './DestinationList.css';
import { DestinationCard } from '../DestinationCard/DestinationCard';
import { notify } from '../../../Utils/notify';
import { errorHandler } from '../../../Utils/ErrorHandler';
import { NavLink, useParams } from 'react-router-dom';
import { FormControlLabel, FormGroup } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import notifyService from '../../../Services/NotifyService';
import { userService } from '../../../Services/UserService';

export function DestinationList(): JSX.Element {
  // Getting all route parameters:
  const params = useParams();

  const [destinations, setDestinations] = useState<DestinationModel[]>([]);
  const [filteredDestinations, setFilteredDestinations] = useState<DestinationModel[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [activeFilter, setActiveFilter] = useState<string>('all'); // Manage active filter

  const itemsPerPage = 9; // Number of items to display per page

    const fetchDestinations = () => {   
    destinationService
      .getAllDestinations()
      .then((destinations) => {
        if (Array.isArray(destinations)) {
          setDestinations(destinations);
          setFilteredDestinations(destinations);
        } else {
          throw new Error('Invalid data format');
        }
      })
      .catch((err) => notify.error(errorHandler.getError(err)));
  }

  useEffect(fetchDestinations, []);

  useEffect(() => {
    applyFilters();
  }, [activeFilter]);

  const applyFilters = async () => {
    let filtered = destinations;

    switch (activeFilter) {
      case 'liked':
        filtered = destinations.filter((destination) => destination.isLiked);
        break;
      case 'active':
        filtered = await destinationService.filterActiveDestinations(destinations);
        break;
      case 'notStarted':
        filtered = await destinationService.filterFutureDestinations(destinations);
        break;
      default:
        // "all" or any other value resets the filter
        filtered = destinations;
        break;
    }

    setFilteredDestinations(filtered);
    setCurrentPage(1); // Reset to the first page when filters change
  };

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
  };

  // Handle page change
  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  // Calculate the destinations to display on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentDestinations = filteredDestinations.slice(indexOfFirstItem, indexOfLastItem);

  async function handleDestinationLike(destinationId: number, isLiked: boolean) {
    const updateDestination = destinations.find(d => d.id === destinationId) 

    updateDestination.isLiked = isLiked ? 0 : 1;
    if (isLiked == true) {
       updateDestination.likesCount--
    }else {
        updateDestination.likesCount++
        
    }
    setDestinations(destinations);
  }



  async function handleDestinationDelete(destinationId: number) {
    try {
      const iAmShure = window.confirm(`Are you sure you want to delete this destination?`);
      if (!iAmShure) return;

      await destinationService.deleteDestination(destinationId);
      notifyService.success('Destination has been deleted');
      fetchDestinations();
    } catch (err: any) {
      notifyService.error(err);
    }
  }

  return (
    <div className="DestinationList">
      <div>
        <FormGroup className="filter">
          <FormControlLabel control={<Checkbox checked={activeFilter === 'all'} onChange={() => handleFilterChange('all')} />} label="כל החופשות" />
          <FormControlLabel control={<Checkbox checked={activeFilter === 'liked'} onChange={() => handleFilterChange('liked')} />} label="Like חופשות" />
          <FormControlLabel control={<Checkbox checked={activeFilter === 'active'} onChange={() => handleFilterChange('active')} />} label="חופשות פעילות" />
          <FormControlLabel control={<Checkbox checked={activeFilter === 'notStarted'} onChange={() => handleFilterChange('notStarted')} />} label="חופשות שעדיין לא התחילו" />
        </FormGroup>
      </div>

      <div>
         {userService.isAdmin() && (
            <>
        <NavLink to="/new-destination"> הוספת חופשה ➕</NavLink>
        <br />
        <NavLink to="/destination/destinationReport"> דוח חופשות 📊</NavLink>
        <br />
        <NavLink to="/destination/destinationCsv"> קובץ חופשות 📋</NavLink>
      </>
      )}
      </div>

      {currentDestinations.map((p) => (
        <DestinationCard key={p.id} destination={p} onDelete={handleDestinationDelete} onLike={handleDestinationLike} />
      ))}

      <div className="pagination">
        <Stack spacing={2}>
          <Pagination count={Math.ceil(filteredDestinations.length / itemsPerPage)} page={currentPage} onChange={handlePageChange} color="primary" />
        </Stack>
      </div>
    </div>
  );
}
