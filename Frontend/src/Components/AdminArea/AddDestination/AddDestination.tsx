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
  const InputProps = {
    style: { padding: 2 },
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
      notify.success('הוספת היעד הסתיימה בהצלחה');
      navigate('/destination');
    } catch (err: any) {
      notify.error(errorHandler.getError(err));
    }
  };

  return (
    <Box className="AddDestination" sx={{ maxWidth: 600, margin: 'auto' }}>
      <Typography variant="h4" component="h4" gutterBottom>
        הוסף חופשה
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="labelContainer">
          <label>יעד</label>
          {errors.destination && <span className="errInput">{errors.destination.message}</span>}
        </div>
        <TextField
          fullWidth
          {...register('destination', {
            required: 'יעד נדרש',
            minLength: { value: 2, message: 'מינימום 2 תווים ליעד' },
            maxLength: { value: 200, message: 'שם יעד לא יכול להיות מעל 200 תווים' },
            pattern: { value: /^[\u0590-\u05FF\s,.-]+$/, message: 'יעד בעברית' },
          })}
          margin="normal"
          InputLabelProps={InputLabelProps}
          inputProps={InputProps}
        />

        <div className="labelContainer">
          <label>תיאור יעד</label>
          {errors.description && <span className="errInput">{errors.description.message}</span>}
        </div>
        <TextField
          fullWidth
          multiline
          rows={4}
          {...register('description', {
            required: 'תיאור יעד נדרש',
            minLength: { value: 2, message: 'מינימום 2 תווים לתיאור יעד' },
            maxLength: { value: 1000, message: 'תיאור יעד לא יכול להיות מעל 1,000 תווים' },
            pattern: { value: /^[\u0590-\u05FF\s,.-]+$/, message: 'תיאור יעד בעברית' },
          })}
          margin="normal"
          InputLabelProps={InputLabelProps}
          inputProps={InputProps}
        />

        <div className="labelContainer">
          <label>מתאריך</label>
          {errors.fromDate && <span className="errInput">{errors.fromDate.message}</span>}
        </div>
        <TextField
          type="date"
          fullWidth
          {...register('fromDate', {
            required: 'תאריך התחלה נדרש',
          })}
          InputLabelProps={{
            shrink: true,
          }}
          margin="normal"
          inputProps={{ ...InputProps, min: minDate }}
        />

        <div className="labelContainer">
          <label>עד תאריך</label>
          {errors.untilDate && <span className="errInput">{errors.untilDate.message}</span>}
        </div>
        <TextField
          label="עד תאריך"
          type="date"
          fullWidth
          {...register('untilDate', {
            required: 'תאריך סיום נדרש',
          })}
          InputLabelProps={{
            shrink: true,
          }}
          margin="normal"
          inputProps={{ ...InputProps, min: minUntilDate }}
        />

        <div className="labelContainer">
          <label>מחיר במטבע 💲</label>
          {errors.price && <span className="errInput">{errors.price.message}</span>}
        </div>
        <TextField
          type="number"
          fullWidth
          {...register('price', {
            required: 'מחיר נדרש',
            min: { value: 100, message: 'מחיר מינימלי 100 דולר' },
            max: { value: 10000, message: 'מחיר מאקסימלי 10,000 דולר' },
          })}
          margin="normal"
          InputLabelProps={InputLabelProps}
          inputProps={InputProps}
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
