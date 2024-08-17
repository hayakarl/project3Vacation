import { useForm } from 'react-hook-form';
import { DestinationModel } from '../../../Models/DestinationModel';
import './EditDestination.css';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { destinationService } from '../../../Services/DestinationService';
import notifyService from '../../../Services/NotifyService';
import { appConfig } from '../../../Utils/AppConfig';

export function EditDestination(): JSX.Element {
  const params = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, formState, setValue } = useForm<DestinationModel>();
  const [imageName, setImageName] = useState<string>('');

  useEffect(() => {
    // fetching the selected vacation by the ID from the route:
    const id = +params.destinationId;
    destinationService
      .getOneDestination(id)
      .then((destination) => {
        setValue('id', destination.id);
        setValue('destination', destination.destination);
        setValue('description', destination.description);
        setValue('fromDate', destination.fromDate.split('.')[0]);
        setValue('untilDate', destination.untilDate.split('.')[0]);
        setValue('price', destination.price);
        setImageName(destination.imageName);
      })
      .catch((err) => notifyService.error(err));
  }, []);

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
    <div className="EditDestination Box">
      <form onSubmit={handleSubmit(send)}>
        <h2>עדכן יעד</h2>

        {/* Destination ID: */}
        <input type="hidden" {...register('id')} />

        <label>יעד: </label>
        <input
          type="text"
          {...register('destination', {
            required: { value: true, message: 'Missing destination' },
            minLength: { value: 2, message: 'Destination must be minimum 2 chars' },
            maxLength: { value: 200, message: "Destination can't exceed 200 chars" },
          })}
        />
        <span>{formState.errors.destination?.message}</span>

        <label>תיאור יעד: </label>
        <input
          type="text"
          {...register('description', {
            required: { value: true, message: 'Missing description' },
            minLength: { value: 2, message: 'Description must be minimum 2 chars' },
            maxLength: { value: 1000, message: "Description can't exceed 100 chars" },
          })}
        />
        <span>{formState.errors.description?.message}</span>

        <label>מתאריך: </label>
        <input
          type="datetime-local"
          {...register('fromDate', {
            required: { value: true, message: 'Missing from date' },
          })}
        />
        <span>{formState.errors.fromDate?.message}</span>

        <label>עד תאריך: </label>
        <input
          type="datetime-local"
          {...register('untilDate', {
            required: { value: true, message: 'Missing until date' },
          })}
        />
        <span>{formState.errors.untilDate?.message}</span>

        <label>מחיר: </label>
        <input
          type="number"
          step="0.01"
          {...register('price', {
            required: { value: true, message: 'Missing price' },
            min: { value: 0, message: "Price can't be negative" },
            max: { value: 10000, message: "Price can't exceed 10000" },
          })}
        />
        <span>{formState.errors.price?.message}</span>

        <label>תמונה</label>
        <br />

        {imageName && <img src={appConfig.backendUrl + 'destinations/images/' + imageName} alt="Destination" style={{ width: '200px', height: 'auto' }} />}
        <input type="file" accept="image/*" {...register('image')} />

        <br />

        <button>עדכן</button>

        <NavLink to="/destination">חזור</NavLink>
      </form>
    </div>
  );
}

export default EditDestination;
