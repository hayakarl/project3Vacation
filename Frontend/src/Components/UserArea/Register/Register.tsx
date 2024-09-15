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
        <label>שם פרטי </label>
        <input
          type="text"
          {...register('firstName', {
            required: 'שם פרטי נדרש',
          })}
        />
        {formState.errors.firstName && <span>{formState.errors.firstName.message}</span>}

        <label>שם משפחה </label>
        <input
          type="text"
          {...register('lastName', {
            required: 'שם משפחה נדרש',
          })}
        />
        {formState.errors.lastName && <span>{formState.errors.lastName.message}</span>}

        <label>אימייל </label>
        <input
          type="email"
          {...register('email', {
            required: 'אימייל נדרש',
            pattern: {
              value: /^[a-z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: 'כתובת אימייל לא תקינה',
            },
          })}
        />
        {formState.errors.email && <span>{formState.errors.email.message}</span>}

        <label>סיסמה </label>
        <input
          type="password"
          {...register('password', {
            required: 'ססמה נדרשת',
            minLength: {
              value: 4,
              message: 'סיסמה חייבת להיות לפחות 4 תווים',
            },
          })}
        />
        {formState.errors.password && <span>{formState.errors.password.message}</span>}

        <button>הרשמה</button>
      </form>
    </div>
  );
}
