import React, { useEffect, useState } from 'react';
import { Chart } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { destinationService } from '../../../Services/DestinationService';
import { DestinationModel } from '../../../Models/DestinationModel';
import { notify } from '../../../Utils/notify';
import { errorHandler } from '../../../Utils/ErrorHandler';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DestinationsReport: React.FC = () => {
  const [destinations, setDestinations] = useState<DestinationModel[]>([]);
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
      .catch((err) => notify.error(errorHandler.getError(err)));
  }, []);

  const chartData = {
    labels: destinations.map((item) => item.destination), // Assuming 'name' is a column in your table
    datasets: [
      {
        label: 'מספר לייקים',
        data: destinations.map((item) => item.likesCount), // Assuming 'value' is a column in your table
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
            color:'red',
        },
      },
      title: {
        display: true,
        text: 'דוח חופשות',
        color: 'red',
        font: {
            size:24,
    
        },
        padding: {
            top:20,
            bottom:20,
        },
      },
    },
    scales: {
      x: {
        ticks: {
            color: 'red',
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: 'red',
          stepSize: 1,
        },
      },
    },
  };

  const handleGoBack = () => {
    navigate(-1); // This will navigate the user back to the previous page
  };

  return (
    <div>
      <div style={{ width: '60%', height: '400px', margin: '0 auto' }}>
        <Chart type="bar" data={chartData} options={options} />
      </div>
      <Button variant="contained" color="primary" onClick={handleGoBack} style={{ marginTop: '20px' }}>
        חזור
      </Button>
    </div>
  );
};

export default DestinationsReport;
