import { Navigate, Route, Routes } from 'react-router-dom';
import './Routing.css';
import { Home } from '../../HomeArea/Home/Home';
import { About } from '../../AboutArea/About/About';
import { DestinationList } from '../../DestinationArea/DestinationList/DestinationList';
import { Page404 } from '../Page404/Page404';
import { AddDestination } from '../../AdminArea/AddDestination/AddDestination';
import { Register } from '../../UserArea/Register/Register';
import { Login } from '../../UserArea/Login/Login';

import { DestinationDetails } from '../../AdminArea/DestinationDetails/DestinationDetails';
import { EditDestination } from '../../AdminArea/EditDestination/EditDestination';
import DestinationsReport from '../../AdminArea/DestinationsReport/DestinationsReport';
import DestinationsCsv from '../../AdminArea/DestinationsCsv/DestinationsCsv';

export function Routing(): JSX.Element {
  return (
    <div className="Routing">
      <Routes>
        {/* Home */}
        <Route path="/home" element={<Home />} />

        {/* Destinations */}
        <Route path="/destination" element={<DestinationList />} />

        {/* Destination Details, DestinationId is the name of this route parameter */}
        <Route path="/destinations/details/:destinationId" element={<DestinationDetails />} />

        {/* Add destination */}
        <Route path="/new-destination" element={<AddDestination />} />

        {/* Edit destination */}
        <Route path="/destinations/edit/:destinationId" element={<EditDestination />} />

        {/* Destinations Report */}
        <Route path="/destination/destinationReport" element={<DestinationsReport />} />

        {/* Destinations csv */}
        <Route path="/destination/destinationCsv" element={<DestinationsCsv />} />

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* About */}
        <Route path="/about" element={<About />} />

        {/* Default Route */}
        <Route path="/" element={<Navigate to="/home" />} />

        {/* Page not found */}
        <Route path="*" element={<Page404 />} />
      </Routes>
    </div>
  );
}
