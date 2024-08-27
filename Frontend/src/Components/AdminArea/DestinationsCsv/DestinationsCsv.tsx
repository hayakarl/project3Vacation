import './DestinationsCsv.css';
import React, { useState, useEffect } from 'react';
import { Button, CircularProgress, Typography } from '@mui/material';
import Papa from 'papaparse';
import { saveAs } from 'file-saver';
import { destinationService } from '../../../Services/DestinationService';
import { DestinationModel } from '../../../Models/DestinationModel';
import { notify } from '../../../Utils/notify';
import { errorHandler } from '../../../Utils/ErrorHandler';
import { useNavigate } from 'react-router-dom';

const downloadCSV = (csv: string, filename: string) => {
  const utf8Bom = '\uFEFF'; // UTF-8 BOM
  const blob = new Blob([utf8Bom + csv], { type: 'text/csv;charset=utf-8;' });
  saveAs(blob, `${filename}.csv`);
};

const DestinationsCsv: React.FC = () => {
  const [destinations, setDestinations] = useState<DestinationModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    destinationService
      .getAllDestinations()
      .then((destinations) => {
        if (Array.isArray(destinations)) {
          setDestinations(destinations);
        } else {
          throw new Error('Invalid data format');
        }
      })
      .catch((err) => {
        const errorMsg = errorHandler.getError(err);
        setError(errorMsg);
        notify.error(errorMsg);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleDownloadCSV = () => {
    const csvData = destinations.map((dest) => ({
      יעדים: dest.destination,
      Likes: dest.likesCount,
    }));

    const csv = Papa.unparse(csvData, { delimiter: ',' }); // or { delimiter: ';' } based on locale
    downloadCSV(csv, 'destinations_report.csv');
  };

  const handleGoBack = () => {
    navigate(-1); // This will navigate the user back to the previous page
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <div>
      <h1>קובץ חופשות</h1>
      <Button variant="contained" color="secondary" onClick={handleDownloadCSV} style={{ marginTop: '20px' }}>
        הורד קובץ
      </Button>

      <Button variant="contained" color="primary" onClick={handleGoBack} style={{ marginTop: '20px' }}>
        חזור
      </Button>
    </div>
  );
};

export default DestinationsCsv;
