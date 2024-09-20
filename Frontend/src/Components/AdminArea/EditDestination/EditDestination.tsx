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
  const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format

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

        // Determine the initial min value for untilDate
        const initialFromDate = destination.fromDate.split('T')[0];
        const initialUntilDate = destination.untilDate.split('T')[0];

        // Set minUntilDate to the greater of fromDate or today
        setMinUntilDate(initialUntilDate < today && initialFromDate < today ? initialFromDate : today);
      })

      .catch((err) => notifyService.error(err));
  }, []);

  // Watch the values of fromDate and untilDate
  const fromDate = watch('fromDate');
  const untilDate = watch('untilDate');

  useEffect(() => {
    if (fromDate && untilDate) {
      // If fromDate is in the past, allow untilDate to be before today
      if (fromDate < today) {
        setMinUntilDate(fromDate); // Allow any date from fromDate onward
      } else {
        // If fromDate is today or in the future, set minUntilDate to today or fromDate, whichever is later
        setMinUntilDate(fromDate > today ? fromDate : today);
      }
    }
  }, [fromDate, untilDate]);

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

        <div className="labelContainer">
          <label>יעד</label>
          {formState.errors.destination && <span className="errInput">{formState.errors.destination.message}</span>}
        </div>
        <TextField
          fullWidth
          {...register('destination', {
            required: { value: true, message: 'יעד נדרש' },
            minLength: { value: 2, message: 'מינימום 2 תווים ליעד' },
            maxLength: { value: 200, message: 'שם יעד לא יכול להיות מעל 200 תווים' },
            pattern: { value: /^[\u0590-\u05FF\s,.-]+$/, message: 'יעד בעברית' },
          })}
          margin="normal"
          InputLabelProps={InputLabelProps}
        />

        <div className="labelContainer">
          <label>תיאור יעד</label>
          {formState.errors.description && <span className="errInput">{formState.errors.description.message}</span>}
        </div>
        <TextField
          fullWidth
          multiline
          rows={4}
          {...register('description', {
            required: { value: true, message: 'תיאור יעד נדרש' },
            minLength: { value: 2, message: 'מינימום 2 תווים לתיאור יעד' },
            maxLength: { value: 1000, message: 'תיאור יעד לא יכול להיות מעל 200 תווים' },
          })}
          margin="normal"
          InputLabelProps={InputLabelProps}
        />

        <div className="labelContainer">
          <label>מתאריך</label>
          {formState.errors.fromDate && <span className="errInput">{formState.errors.fromDate.message}</span>}
        </div>
        <TextField
          type="date"
          fullWidth
          {...register('fromDate', {
            required: { value: true, message: 'תאריך התחלה נדרש' },
          })}
          InputLabelProps={InputLabelProps}
          margin="normal"
        />

        <div className="labelContainer">
          <label>עד תאריך</label>
          {formState.errors.untilDate && <span className="errInput">{formState.errors.untilDate.message}</span>}
        </div>
        <TextField
          type="date"
          {...register('untilDate', {
            required: 'תאריך סיום נדרש',
            validate: (value) => !fromDate || value >= fromDate || 'תאריך סיום חייב להיות אחרי תאריך התחלה',
          })}
          InputLabelProps={InputLabelProps}
          inputProps={{
            min: minUntilDate || undefined, // Apply the calculated min value
          }}
          margin="normal"
        />

        <div className="labelContainer">
          <label>מחיר במטבע 💲</label>
          {formState.errors.price && <span className="errInput">{formState.errors.price.message}</span>}
        </div>
        <TextField
          type="number"
          fullWidth
          {...register('price', {
            required: { value: true, message: 'מחיר נדרש' },
            min: { value: 0, message: 'מחיר לא יכול להיות שלילי' },
            max: { value: 10000, message: 'מחיר מאקסימלי 10,000 דולר' },
          })}
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
