import { useForm } from 'react-hook-form';
import './Register.css';
import { UserModel } from '../../../Models/UserModel';
import { userService } from '../../../Services/UserService';
import { notify } from '../../../Utils/notify';
import { errorHandler } from '../../../Utils/ErrorHandler';

export function Register(): JSX.Element {
  const { register, handleSubmit } = useForm<UserModel>();
  
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
        <input type="text" {...register('firstName')} />
        <label>שם משפחה </label>
        <input type="text" {...register('lastName')} />
        <label>אימייל </label>
        <input type="email" {...register('email')} />
        <label>סיסמה </label>
        <input type="password" {...register('password')} />

        <button>הרשמה</button>
      </form>
    </div>
  );
}
