import { useForm } from 'react-hook-form';
import { DestinationModel } from '../../../Models/DestinationModel';
import './EditDestination.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { destinationService } from '../../../Services/DestinationService';
import notifyService from '../../../Services/NotifyService';
import { appConfig } from '../../../Utils/AppConfig';
import { TextField, Typography, Button, Box, IconButton } from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
import { userService } from '../../../Services/UserService';

export function EditDestination(): JSX.Element {
  const params = useParams();
  const navigate = useNavigate();

  const InputLabelProps = {
    shrink: true, // Keep the label on top
    sx: {
      color: 'inherit', // Keep the label color consistent
      '&.Mui-focused': {
        color: 'inherit', // Keep the label color consistent when focused
      },
    },
  };

  const inputProps = {
    style: { textAlign: 'right', direction: 'rtl' }, // Align input text to right
  };

  const { register, handleSubmit, formState, setValue, watch } = useForm<DestinationModel>();
  const [imageName, setImageName] = useState<string>('');
  const [minUntilDate, setMinUntilDate] = useState<string>('');

  useEffect(() => {
    if (!userService.isAdmin()) {
      navigate('/home');
    }
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

  //Update fromDate effect untilDate
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
      notifyService.success('היעד עודכן בהצלחה');
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
            pattern: { value: /^[\u0590-\u05FF\s,.-]+$/, message: 'Only Hebrew characters are allowed' },
          })}
          error={!!formState.errors.destination}
          helperText={formState.errors.destination?.message}
          margin="normal"
          InputLabelProps={InputLabelProps}
        />

        <TextField
          label="תיאור יעד"
          fullWidth
          multiline
          rows={4}
          {...register('description', {
            required: { value: true, message: 'Missing description' },
            minLength: { value: 2, message: 'Description must be minimum 2 chars' },
            maxLength: { value: 1000, message: "Description can't exceed 1000 chars" },
          })}
          error={!!formState.errors.description}
          helperText={formState.errors.description?.message}
          margin="normal"
          InputLabelProps={InputLabelProps}
        />

        <TextField
          label="מתאריך"
          type="date"
          fullWidth
          {...register('fromDate', {
            required: { value: true, message: 'Missing from date' },
          })}
          InputLabelProps={InputLabelProps}
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
          InputLabelProps={InputLabelProps}
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
          InputLabelProps={InputLabelProps}
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
