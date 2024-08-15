import './AddDestination.css';
import { useForm } from 'react-hook-form';
import { DestinationModel } from '../../../Models/DestinationModel';
import { destinationService } from '../../../Services/DestinationService';
import { NavLink, useNavigate } from 'react-router-dom';
import { notify } from '../../../Utils/notify';
import { errorHandler } from '../../../Utils/ErrorHandler';
import { Add } from '@mui/icons-material';
import { TextField, Typography, Button } from '@mui/material';

import { JSX } from 'react/jsx-runtime';

export function AddDestination(): JSX.Element {
  const { handleSubmit, register } = useForm<DestinationModel>();
  const navigate = useNavigate();

  async function send(destination: DestinationModel) {
    try {
      destination.image = (destination.image as unknown as FileList)[0];

      await destinationService.addDestination(destination);
      notify.success('Destination has been added');
      navigate('/destination');
    } catch (err: any) {
      notify.error(errorHandler.getError(err));
    }
  }

  return (
    <div className="AddDestination">
      <Typography variant="h3">
        הוסף חופשה &nbsp;
        <Add fontSize="small" />
      </Typography>

      <form onSubmit={handleSubmit(send)}>
        <TextField label="יעד:" type="text" {...register('destination')} required inputProps={{ minLength: 2, maxLength: 100 }} />

        <TextField label="תיאור:" type="text" {...register('description')} required inputProps={{ minLength: 2, maxLength: 1000 }} />

        <TextField label="מתאריך" type="datetime-local" {...register('fromDate')} required />

        <TextField label="עד תאריך" type="datetime-local" {...register('untilDate')} required />

        <TextField label="מחיר" type="number" {...register('price')} required inputProps={{ min: 100, max: 5000 }} />

        <label>תמונה</label>
        <input type="file" accept="image/*" {...register('image')} />

        <br />
        <br />

        <Button type="submit" variant="contained">
          Add
        </Button>

        <NavLink to="/destination">חזור</NavLink>
      </form>
    </div>
  );
}
