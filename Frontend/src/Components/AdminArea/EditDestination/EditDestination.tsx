import { useForm } from 'react-hook-form';
import { DestinationModel } from '../../../Models/DestinationModel';
import './EditDestination.css';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { destinationService } from '../../../Services/DestinationService';
import notifyService from '../../../Services/NotifyService';
import { appConfig } from '../../../Utils/AppConfig';
import { TextField, Typography, Button, Box, IconButton, Stack } from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';

export function EditDestination(): JSX.Element {
  const params = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, formState, setValue, watch } = useForm<DestinationModel>();
  const [imageName, setImageName] = useState<string>('');
  const [minUntilDate, setMinUntilDate] = useState<string>('');

  useEffect(() => {
    // fetching the selected vacation by the ID from the route:
    const id = +params.destinationId;
    destinationService
      .getOneDestination(id)
      .then((destination) => {
        setValue('id', destination.id);
        setValue('destination', destination.destination);
        setValue('description', destination.description);
        setValue('fromDate', destination.fromDate.split('T')[0]);
        setValue('untilDate', destination.untilDate.split('T')[0]);
        setValue('price', destination.price);
        setImageName(destination.imageName);
        setMinUntilDate(destination.fromDate.split('T')[0]); // Set initial min value for untilDate
      })
      .catch((err) => notifyService.error(err));
  }, []);

  // מעקב אחר שדה מתאריך לעדכון מינימום תאריך הסיום בהתאם
  const fromDate = watch('fromDate');

  useEffect(() => {
    if (fromDate) {
      setMinUntilDate(fromDate);
    }
  }, [fromDate]);

  async function send(destination: DestinationModel) {
    try {
      destination.image = (destination.image as unknown as FileList)[0];

      await destinationService.updateDestination(destination);
      notifyService.success('Destination has been updated');
      navigate('/destination');
    } catch (err: any) {
      notifyService.error(err);
    }
  }

  return (
    <Box className="EditDestination" sx={{ p: 3, maxWidth: 600, margin: 'auto' }}>
      <Typography variant="h4" component="h2" gutterBottom>
        עדכן יעד
      </Typography>

      <form onSubmit={handleSubmit(send)}>
        {/* Destination ID: */}
        <input type="hidden" {...register('id')} />

        <TextField
          label="יעד"
          fullWidth
          {...register('destination', {
            required: { value: true, message: 'Missing destination' },
            minLength: { value: 2, message: 'Destination must be minimum 2 chars' },
            maxLength: { value: 200, message: "Destination can't exceed 200 chars" },
          })}
          error={!!formState.errors.destination}
          helperText={formState.errors.destination?.message}
          margin="normal"
          InputLabelProps={{
            shrink: true, // Keep the label on top
            sx: {
              textAlign: 'right',
              right: 18,
              left: 'auto',
              transformOrigin: 'top right',
              color: 'inherit', // Keep the label color consistent
              '&.Mui-focused': {
                color: 'inherit', // Keep the label color consistent when focused
              },
            },
          }}
          inputProps={{
            style: { textAlign: 'right', direction: 'rtl' }, // Align input text to right
          }}
        />

        <TextField
          label="תיאור יעד"
          fullWidth
          multiline
          rows={4}
          {...register('description', {
            required: { value: true, message: 'Missing description' },
            minLength: { value: 2, message: 'Description must be minimum 2 chars' },
            maxLength: { value: 1000, message: "Description can't exceed 100 chars" },
          })}
          error={!!formState.errors.description}
          helperText={formState.errors.description?.message}
          margin="normal"
          InputLabelProps={{
            shrink: true, // Keep the label on top
            sx: {
              textAlign: 'right',
              right: 18,
              left: 'auto',
              transformOrigin: 'top right',
              color: 'inherit', // Keep the label color consistent
              '&.Mui-focused': {
                color: 'inherit', // Keep the label color consistent when focused
              },
            },
          }}
          inputProps={{
            style: { textAlign: 'right', direction: 'rtl' }, // Align input text to right
          }}
        />

        <TextField
          label="מתאריך"
          type="date"
          fullWidth
          {...register('fromDate', {
            required: { value: true, message: 'Missing from date' },
          })}
          InputLabelProps={{
            shrink: true,
          }}
          error={!!formState.errors.fromDate}
          helperText={formState.errors.fromDate?.message}
          margin="normal"
        />

        <TextField
          label="עד תאריך:"
          type="date"
          {...register('untilDate', {
            required: { value: true, message: 'Missing until date' },
          })}
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            min: minUntilDate,
          }}
          error={!!formState.errors.untilDate}
          helperText={formState.errors.untilDate?.message}
          margin="normal"
        />
        <TextField
          label="מחיר במטבע 💲:"
          type="number"
          fullWidth
          {...register('price', {
            required: { value: true, message: 'Missing price' },
            min: { value: 0, message: "Price can't be negative" },
            max: { value: 10000, message: "Price can't exceed 10000" },
          })}
          error={!!formState.errors.price}
          helperText={formState.errors.price?.message}
          margin="normal"
          InputLabelProps={{
            shrink: true, // Keep the label on top
            sx: {
              textAlign: 'right',
              right: 18,
              left: 'auto',
              transformOrigin: 'top right',
              color: 'inherit', // Keep the label color consistent
              '&.Mui-focused': {
                color: 'inherit', // Keep the label color consistent when focused
              },
            },
          }}
          inputProps={{
            style: { textAlign: 'right', direction: 'rtl' }, // Align input text to right
          }}
        />
        <Box mt={2} mb={2}>
          <Typography variant="body1" gutterBottom>
            תמונה
          </Typography>

          {imageName && (
            <Box mb={2}>
              <img src={`${appConfig.backendUrl}destinations/images/${imageName}`} alt="Destination" style={{ width: '100%', height: 'auto', borderRadius: 8 }} />
            </Box>
          )}

          <Box display="flex" alignItems="center" justifyContent="flex-end">
            <IconButton color="primary" aria-label="upload picture" component="label">
              <input hidden type="file" accept="image/*" {...register('image')} />
              <PhotoCamera />
            </IconButton>
            <Typography variant="body2" sx={{ ml: 1 }}>
              החלף תמונה
            </Typography>
          </Box>
        </Box>

        <Button type="submit" variant="contained" color="primary" fullWidth>
          עדכן
        </Button>

        <Button variant="text" color="secondary" fullWidth onClick={() => navigate('/destination')}>
          חזור
        </Button>
      </form>
    </Box>
  );
}

export default EditDestination;
