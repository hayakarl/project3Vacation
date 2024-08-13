import "./DestinationsCsv.css";
import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import Papa from 'papaparse';
import { saveAs } from 'file-saver';
import { destinationService } from '../../../Services/DestinationService';
import { DestinationModel } from '../../../Models/DestinationModel';
import { notify } from '../../../Utils/notify';
import { errorHandler } from '../../../Utils/ErrorHandler';
import { useNavigate } from "react-router-dom";

const convertToCSV = (data: any[]) => {
  const header = Object.keys(data[0]).join(",") + "\n";
  const rows = data.map(row => Object.values(row).join(",")).join("\n");
  return header + rows;
};


const downloadCSV = (csv: string, filename: string) => {
  const utf8Bom = '\uFEFF'; // UTF-8 BOM
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  saveAs(blob, filename);
};


const DestinationsCsv: React.FC = () => {
  const [destinations, setDestinations] = useState<DestinationModel[]>([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    destinationService.getAllDestinations()
      .then(destinations => {
        if (Array.isArray(destinations)) {
          setDestinations(destinations);
        } else {
          throw new Error("Invalid data format");
        }
      })
      .catch((err) => notify.error(errorHandler.getError(err)));
  }, []);

  const handleDownloadCSV = () => {
    const csvData = destinations.map(dest => ({
      Destination: dest.destination,
      Likes: dest.likesCount,
    }));

    const csv = Papa.unparse(csvData);
    downloadCSV(csv, 'destinations_report.csv');
  };

  const downloadCSV = (csv: string, filename: string) => {
    const utf8Bom = '\uFEFF'; // UTF-8 BOM
    const blob = new Blob([utf8Bom +csv], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, filename);
  };

  const handleGoBack = () => {
    navigate(-1); // This will navigate the user back to the previous page
  };

  return (
    <div>
      <h1>קובץ חופשות</h1>
      <Button 
        variant="contained" 
        color="secondary" 
        onClick={handleDownloadCSV} 
        style={{ marginTop: '20px' }}
      >
        הורד קובץ
      </Button>
   
   
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleGoBack} 
        style={{ marginTop: '20px' }}

      >
        חזור
      </Button>
     </div>
  );
};

export default DestinationsCsv;
