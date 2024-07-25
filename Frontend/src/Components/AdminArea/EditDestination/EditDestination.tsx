import { useForm } from "react-hook-form";
import { DestinationModel } from "../../../Models/DestinationModel";
import "./EditDestination.css";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { destinationService } from "../../../Services/DestinationService";
import notifyService from "../../../Services/NotifyService";
// import { DateRangePicker } from "rsuite";

export function EditDestination(): JSX.Element {

    const params = useParams();
    const navigate = useNavigate();
    const { register, handleSubmit, formState, setValue } = useForm<DestinationModel>();
    // const [destination, setDestination] = useState<DestinationModel>();
    // const { before } = DateRangePicker;


    useEffect(() => {
        // fetching the selected vacation by the ID from the route: 
        const id = +params.destinationId;
        destinationService.getOneDestination(id)
            .then(destination => {
                setValue('id', destination.id);
                setValue('destination', destination.destination);
                setValue('description', destination.description);
                setValue('fromDate', destination.fromDate);
                setValue('untilDate', destination.untilDate);
                setValue('price', destination.price);
            })
            .catch(err => notifyService.error(err));
    }, []);

    async function send(destination: DestinationModel) {
        try {
            await destinationService.updateDestination(destination);
            notifyService.success("Destination has been updated");
            navigate("/destination");
        }
        catch (err: any) {
            notifyService.error(err);
        }
    }

    return (
      <div className="EditDestination Box">
        <form onSubmit={handleSubmit(send)}>
          <h2>Edit Destination</h2>

          {/* Destination ID: */}
          <input type="hidden" {...register('id')} />

          <label>Destination: </label>
          <input
            type="text"
            {...register('destination', {
              required: { value: true, message: 'Missing destination' },
              minLength: {
                value: 2,
                message: 'Destination must be minimum 2 chars',
              },
              maxLength: {
                value: 100,
                message: "Destination can't exceed 100 chars",
              },
            })}
          />
          <span>{formState.errors.destination?.message}</span>

          <label>Description: </label>
          <input
            type="text"
            {...register('description', {
              required: { value: true, message: 'Missing description' },
              minLength: {
                value: 2,
                message: 'Description must be minimum 2 chars',
              },
              maxLength: {
                value: 1000,
                message: "Description can't exceed 100 chars",
              },
            })}
          />
          <span>{formState.errors.description?.message}</span>

          <label>From date: </label>
          <input
            type="Date | string"
            {...register('fromDate', {
              required: { value: true, message: 'Missing from date' },
            })}
          />
          <span>{formState.errors.fromDate?.message}</span>

          <label>Until date: </label>
          <input
            type="text"
            {...register('untilDate', {
              required: { value: true, message: 'Missing until date' },
            })}
          />
          <span>{formState.errors.untilDate?.message}</span>


            {/* <label>Dates:</label>
            <DateRangePicker
                    format="dd-MM-yyyy"
                    defaultValue={[destination.fromDate, destination.untilDate]}
                    showOneCalendar
                    disabledDate={before(new Date())}
                    character=" until "
                    cleanable={false}
                    // onChange={(dates) => changeDates(dates)} 
           /> */}


          <label>Price: </label>
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

          <label>Image: </label>
          <input type="file" accept="image/*" {...register('image')} />

          <br />
          <br />

          <button>עדכן</button>
          <span> | </span>
          <NavLink to="/destination">חזור</NavLink>
        </form>
      </div>
    );
}

export default EditDestination;
