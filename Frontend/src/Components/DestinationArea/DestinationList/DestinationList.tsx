import { useEffect, useState } from 'react';
import { DestinationModel } from '../../../Models/DestinationModel';
import { destinationService } from '../../../Services/DestinationService';
import './DestinationList.css';
import { DestinationCard } from '../DestinationCard/DestinationCard';
import { notify } from '../../../Utils/notify';
import { errorHandler } from '../../../Utils/ErrorHandler';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { FormControlLabel, FormGroup } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import notifyService from '../../../Services/NotifyService';
import { userService } from '../../../Services/UserService';

export function DestinationList(): JSX.Element {
  // Getting all route parameters:
  const params = useParams();
  const itemsPerPage = 9; // Number of items to display per page

  const [destinations, setDestinations] = useState<DestinationModel[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [destinationsCount, setDestinationsCount] = useState<number>(itemsPerPage);
  const navigate = useNavigate();

  const fetchDestinations = () => {
    destinationService
      .getAllDestinations()
      .then((destinations) => {
        //filter
        if (Array.isArray(destinations)) {
          const filteredDestinations = applyFilters(destinations);
          setDestinationsCount(filteredDestinations.length);
          const pageDestinations = applyPagination(filteredDestinations);
          setDestinations(pageDestinations);
        } else {
          throw new Error('Invalid data format');
        }
      })
      .catch((err) => notify.error(errorHandler.getError(err)));
  };

  useEffect(() => {
    if (userService.getUserData() === null) {
      navigate('/home');
    }
  }, []);

  useEffect(fetchDestinations, [activeFilter, currentPage]);

  const applyPagination = (destinations: DestinationModel[]) => {
    // Calculate the destinations to display on the current page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return destinations.slice(indexOfFirstItem, indexOfLastItem);
  };

  const applyFilters = (destinations: DestinationModel[]) => {
    const now = new Date();

    switch (activeFilter) {
      case 'liked':
        return destinations.filter((destination) => destination.isLiked);
        break;
      case 'active':
        return destinations.filter((d) => {
          const fromDate = new Date(d.fromDate);
          const untilDate = new Date(d.untilDate);
          return fromDate <= now && untilDate >= now;
        });
        break;
      case 'notStarted':
        return destinations.filter((d) => {
          const fromDate = new Date(d.fromDate);
          return fromDate > now;
        });
        break;
      default:
        // "all" or any other value resets the filter
        return destinations;
        break;
    }
  };

  const handleFilterChange = (filter: string) => {
    setCurrentPage(1);
    setActiveFilter(filter);
  };

  // Handle page change
  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  async function handleDestinationLike(destinationId: number, isLiked: boolean) {
    setDestinations(
      destinations.map((d) => {
        if (destinationId == d.id) {
          return { ...d, isLiked: d.isLiked ? 0 : 1, likesCount: d.likesCount + (d.isLiked ? -1 : +1) };
        }
        return d;
      })
    );
  }

  async function handleDestinationDelete(destinationId: number) {
    try {
      const iAmShure = window.confirm(`Are you sure you want to delete this destination?`);
      if (!iAmShure) return;

      await destinationService.deleteDestination(destinationId);
      notifyService.success('היעד נמחק');
      fetchDestinations();
    } catch (err: any) {
      notifyService.error(err);
    }
  }

  return (
    <div className="DestinationListContainer">
      <div>
        <FormGroup className="filter">
          <FormControlLabel control={<Checkbox checked={activeFilter === 'all'} onChange={() => handleFilterChange('all')} />} label="כל החופשות" />
          <FormControlLabel control={<Checkbox checked={activeFilter === 'liked'} onChange={() => handleFilterChange('liked')} />} label="Like חופשות" />
          <FormControlLabel control={<Checkbox checked={activeFilter === 'active'} onChange={() => handleFilterChange('active')} />} label="חופשות פעילות" />
          <FormControlLabel control={<Checkbox checked={activeFilter === 'notStarted'} onChange={() => handleFilterChange('notStarted')} />} label="חופשות עתידיות" />
        </FormGroup>
      </div>

      <div className="admin-links">
        {userService.isAdmin() && (
          <>
            <NavLink className="Button" to="/new-destination">
              {' '}
              הוספת חופשה ➕
            </NavLink>
            <NavLink className="Button" to="/destination/destinationReport">
              {' '}
              דוח חופשות 📊
            </NavLink>
            <NavLink className="Button" to="/destination/destinationCsv">
              {' '}
              קובץ חופשות 📋
            </NavLink>
          </>
        )}
      </div>

      <div className="DestinationList">
        {destinations.map((p) => (
          <DestinationCard key={p.id} destination={p} onDelete={handleDestinationDelete} onLike={handleDestinationLike} />
        ))}
      </div>
      <div className="pagination">
        <Stack spacing={2}>
          <Pagination count={Math.ceil(destinationsCount / itemsPerPage)} page={currentPage} onChange={handlePageChange} color="primary" />
        </Stack>
      </div>
    </div>
  );
}
