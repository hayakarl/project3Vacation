import "./AddDestination.css";
import { useForm } from 'react-hook-form';
import { DestinationModel } from '../../../Models/DestinationModel';
import { destinationService } from '../../../Services/DestinationService';
import { NavLink, useNavigate } from 'react-router-dom';
import { notify } from '../../../Utils/notify';
import { errorHandler } from '../../../Utils/ErrorHandler';

import { DateRangePicker } from "rsuite";

import { Add } from '@mui/icons-material';
import { TextField, Typography} from '@mui/material';
import { useState } from "react";
import { DateRange } from "rsuite/esm/DateRangePicker";

export function AddDestination(): JSX.Element {

  const { register, handleSubmit } = useForm<DestinationModel>();
  const [dates, setDates] = useState<[Date, Date] | null>(null);
  const [dateError, setDateError] = useState<string>('');
  const { beforeToday } = DateRangePicker;
  const navigate = useNavigate();

//   const handleRangeChange = (value: [Date | null, Date | null]) => {
//     setDateRange(value);
//   };

  async function send(destination: DestinationModel) {
    try {
        
      destination.image = (destination.image as unknown as FileList)[0];
    
      destination.fromDate = dates[0];
      destination.untilDate = dates[1];

      await destinationService.addDestination(destination);
      notify.success('Destination has been added');
      navigate('/destination');
    } catch (err: any) {
      notify.error(errorHandler.getError(err));
    }
  }

  return (
    <div className="AddDestination">
      <Typography variant="h3">הוסף חופשה &nbsp;<Add fontSize="small" /></Typography>

      <form onSubmit={handleSubmit(send)}>

        <TextField label="Destination:" type="text" {...register('destination')}
          required
          inputProps={{ minLength: 2, maxLength: 100 }}
        />

        <TextField label="Description:" type="text"{...register('description')}
          required
          inputProps={{ minLength: 2, maxLength: 1000 }}
        />

        {/* <label>From Date: </label>
        <input type="text" {...register('fromDate')} required />
        <label>Until Date: </label>
        <input type="text" {...register('untilDate')} required />  */}

        <label>Date range:</label>
        <DateRangePicker
          format="dd.MM.yyyy"
        //   value={dateRange}
         defaultValue={[dates[0],dates[1]]}
          showOneCalendar
          placement="bottomEnd"
          shouldDisableDate={beforeToday()}
          character=" until "
          cleanable={true}
          onChange=   {(d) => {
            setDates(d);
            setDateError(''); 
          }}/>

        <span className="error-message">{dateError}</span>

        <TextField label="Price:" type="number" {...register('price')}
          required
          inputProps={{ min: 100, max: 5000 }}
        />

        <label>Image:</label>
        <input type="file" accept="image/*" {...register('image')} />

        <button>Add</button>
          
        <NavLink to="/destination">חזור</NavLink>
          
      </form>
    </div>
  );
}