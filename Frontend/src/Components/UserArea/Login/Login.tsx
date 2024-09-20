import { useForm } from 'react-hook-form';
import './Login.css';
import { CredentialsModel } from '../../../Models/CredentialsModel';
import { userService } from '../../../Services/UserService';
import { errorHandler } from '../../../Utils/ErrorHandler';
import { notify } from '../../../Utils/notify';

export function Login(): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CredentialsModel>();

  async function send(credentials: CredentialsModel) {
    try {
      await userService.login(credentials);
      //refresh page
      window.location.href = '/destination';
    } catch (err: any) {
      const errorMessage = errorHandler.getError(err);
      notify.error(errorMessage);
    }
  }

  return (
    <div className="Login">
      <form onSubmit={handleSubmit(send)}>
        <div className="labelContainer">
          <label htmlFor="email">אימייל</label>
          {errors.email && <span className="errInput">{errors.email.message}</span>}
        </div>
        <input
          type="email"
          id="email"
          {...register('email', {
            required: 'אימייל נדרש',
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: 'כתובת אימייל לא תקינה',
            },
          })}
        />

        <div className="labelContainer">
          <label htmlFor="password">סיסמה</label>
          {errors.password && <span className="errInput">{errors.password.message}</span>}
        </div>

        <input
          type="password"
          id="password"
          {...register('password', {
            required: 'סיסמה נדרשת',
            minLength: {
              value: 4,
              message: 'סיסמה חייבת להיות לפחות 4 תווים',
            },
          })}
        />

        <button>כניסה</button>
      </form>
    </div>
  );
}
