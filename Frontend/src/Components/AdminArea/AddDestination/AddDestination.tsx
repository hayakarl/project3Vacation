import './AddDestination.css';
import { useForm, SubmitHandler } from 'react-hook-form';
import { DestinationModel } from '../../../Models/DestinationModel';
import { destinationService } from '../../../Services/DestinationService';
import { NavLink, useNavigate } from 'react-router-dom';
import { notify } from '../../../Utils/notify';
import { errorHandler } from '../../../Utils/ErrorHandler';
import { Add } from '@mui/icons-material';
import { TextField, Typography, Button, Box, IconButton } from '@mui/material';
import { useEffect, useState } from 'react';
import { JSX } from 'react/jsx-runtime';
import { PhotoCamera } from '@mui/icons-material';
import { userService } from '../../../Services/UserService';

export function AddDestination(): JSX.Element {
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<DestinationModel>();
  const navigate = useNavigate();
  const [minDate, setMinDate] = useState<string>('');
  const [minUntilDate, setMinUntilDate] = useState<string>('');
  const InputLabelProps = {
    shrink: true, // Keep the label on top
    sx: {
      color: 'inherit', // Keep the label color consistent
      '&.Mui-focused': {
        color: 'inherit', // Keep the label color consistent when focused
      },
    },
  };

  useEffect(() => {
    if (!userService.isAdmin()) {
      navigate('/home');
    }
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    setMinDate(`${year}-${month}-${day}`);
  }, []);

  // Watch the fromDate field to update the minUntilDate accordingly
  const fromDate = watch('fromDate');

  useEffect(() => {
    if (fromDate) {
      setMinUntilDate(fromDate);
    } else {
      setMinUntilDate(minDate); // If fromDate is not set, use today's date as default
    }
  }, [fromDate, minDate]);

  const onSubmit: SubmitHandler<DestinationModel> = async (destination) => {
    try {
      destination.image = (destination.image as unknown as FileList)[0];

      await destinationService.addDestination(destination);
      notify.success('Destination has been added');
      navigate('/destination');
    } catch (err: any) {
      notify.error(errorHandler.getError(err));
    }
  };

  return (
    <Box className="AddDestination" sx={{ p: 3, maxWidth: 600, margin: 'auto' }}>
      <Typography variant="h4" component="h2" gutterBottom>
        הוסף חופשה &nbsp;
        <Add fontSize="small" />
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="יעד"
          fullWidth
          {...register('destination', {
            required: 'Missing destination',
            minLength: { value: 2, message: 'Destination must be minimum 2 chars' },
            maxLength: { value: 200, message: "Destination can't exceed 200 chars" },
            pattern: { value: /^[\u0590-\u05FF\s]+$/, message: 'Only Hebrew characters are allowed' },
          })}
          error={!!errors.destination}
          helperText={errors.destination?.message}
          margin="normal"
          InputLabelProps={InputLabelProps}
        />

        <TextField
          label="תיאור יעד"
          fullWidth
          multiline
          rows={4}
          {...register('description', {
            required: 'Missing description',
            minLength: { value: 2, message: 'Description must be minimum 2 chars' },
            maxLength: { value: 1000, message: "Description can't exceed 1000 chars" },
            pattern: { value: /^[\u0590-\u05FF\s]+$/, message: 'Only Hebrew characters are allowed' },
          })}
          error={!!errors.description}
          helperText={errors.description?.message}
          margin="normal"
          InputLabelProps={InputLabelProps}
        />

        <TextField
          label="מתאריך"
          type="date"
          fullWidth
          {...register('fromDate', {
            required: 'Missing from date',
          })}
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            min: minDate, // Prevent selecting past dates
          }}
          error={!!errors.fromDate}
          helperText={errors.fromDate?.message}
          margin="normal"
        />

        <TextField
          label="עד תאריך"
          type="date"
          fullWidth
          {...register('untilDate', {
            required: 'Missing until date',
          })}
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            min: minUntilDate,
          }}
          error={!!errors.untilDate}
          helperText={errors.untilDate?.message}
          margin="normal"
        />

        <TextField
          label="מחיר במטבע 💲"
          type="number"
          fullWidth
          {...register('price', {
            required: 'Missing price',
            min: { value: 100, message: "Price can't be less than 100" },
            max: { value: 10000, message: "Price can't exceed 10000" },
          })}
          error={!!errors.price}
          helperText={errors.price?.message}
          margin="normal"
          InputLabelProps={InputLabelProps}
        />

        <Box mt={2} mb={2}>
          <Box display="flex" alignItems="center" justifyContent="flex-end">
            <IconButton color="primary" aria-label="upload picture" component="label">
              <input hidden type="file" accept="image/*" {...register('image')} />
              <PhotoCamera />
            </IconButton>
            <Typography variant="body2" sx={{ ml: 1 }}>
              העלה תמונה
            </Typography>
          </Box>
        </Box>

        <Button type="submit" variant="contained" color="primary" fullWidth>
          הוסף
        </Button>

        <Button variant="text" color="primary" fullWidth component={NavLink} to="/destination">
          חזור
        </Button>
      </form>
    </Box>
  );
}
export default AddDestination;
