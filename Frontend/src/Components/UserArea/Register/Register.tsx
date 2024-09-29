import { useForm } from 'react-hook-form';
import './Register.css';
import { UserModel } from '../../../Models/UserModel';
import { userService } from '../../../Services/UserService';
import { notify } from '../../../Utils/notify';
import { errorHandler } from '../../../Utils/ErrorHandler';

export function Register(): JSX.Element {
  const { register, handleSubmit, formState } = useForm<UserModel>();

  async function send(user: UserModel) {
    try {
      await userService.register(user);
      notify.success('שמחים שנרשמת ' + user.firstName);
      window.location.href = '/destination';
    } catch (err: any) {
      notify.error(errorHandler.getError(err));
    }
  }

  return (
    <div className="Register">
      <form onSubmit={handleSubmit(send)}>
        <div className="labelContainer">
          <label>שם פרטי :</label>
          {formState.errors.firstName && <span className="errInput">{formState.errors.firstName.message}</span>}
        </div>
        <input
          type="text"
          {...register('firstName', {
            required: 'שם פרטי נדרש',
          })}
        />

        <div className="labelContainer">
          <label>שם משפחה :</label>
          {formState.errors.lastName && <span className="errInput">{formState.errors.lastName.message}</span>}
        </div>
        <input
          type="text"
          {...register('lastName', {
            required: 'שם משפחה נדרש',
          })}
        />
        <div className="labelContainer">
          <label>אימייל :</label>
          {formState.errors.email && <span className="errInput">{formState.errors.email.message}</span>}
        </div>
        <input
          type="email"
          {...register('email', {
            required: 'אימייל נדרש',
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/,
              message: 'כתובת אימייל לא תקינה',
            },
          })}
        />
        <div className="labelContainer">
          <label>סיסמה :</label>
          {formState.errors.password && <span className="errInput">{formState.errors.password.message}</span>}
        </div>
        <input
          type="password"
          {...register('password', {
            required: 'סיסמה נדרשת',
            minLength: {
              value: 4,
              message: 'סיסמה חייבת להיות לפחות 4 תווים',
            },
          })}
        />

        <button type='submit'>הרשמה</button>
      </form>
    </div>
  );
}
