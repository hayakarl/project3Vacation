import { useForm } from 'react-hook-form';
import './Login.css';
import { CredentialsModel } from '../../../Models/CredentialsModel';
import { userService } from '../../../Services/UserService';
import { errorHandler } from '../../../Utils/ErrorHandler';
import { notify } from '../../../Utils/notify';

export function Login(): JSX.Element {
  const { register, handleSubmit } = useForm<CredentialsModel>();
 
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
        <label>Email: </label>
        <input type="email" {...register('email')} />

        <label>Password: </label>
        <input type="password" {...register('password')} />

        <br />
        <br />

        <button>Login</button>
      </form>
    </div>
  );
}
