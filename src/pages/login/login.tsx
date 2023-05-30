import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { User } from '../../types/user/user';
import { useAppDispatch } from '../../hooks/store-hooks/use-app-dispatch';
import { checkAuthStatus } from '../../store/user/api-actions';
import { setId, setToken } from '../../services/token';
import { AppRoute } from '../../utils/const/const';
import { useAppSelector } from '../../hooks/store-hooks/use-app-selector';
import { getAuthStatus } from '../../store/user/selectors';

export default function Login (): JSX.Element {
  const { register, handleSubmit } = useForm<User>();
  const dispatch = useAppDispatch();
  const authStatus = useAppSelector(getAuthStatus);

  const onFormSubmit: SubmitHandler<User> = async (data) => {
    try {
      await dispatch(checkAuthStatus({ id: data.id, token: data.token }));
      setToken(data);
      setId(data);
    } catch {
      toast.error('Login failed.');
    }
  };

  const onFormSubmitError: SubmitErrorHandler<User> = (errors) => {
    if (errors.id) {
      toast.error('Введите верный e-mail.');
    } else if (errors.token) {
      toast.error('Пароль должен быть не короче трех символов и содержать хотя бы одну букву и одну цифру.');
    }
  };

  if (authStatus.auth) {
    return <Navigate to={AppRoute.Main} />;
  }

  return (
    <div className="login-wrapper">
      <form className="login-wrapper" onSubmit={handleSubmit(onFormSubmit, onFormSubmitError)}>
        <label htmlFor={'id'}>Instance id</label>
        <input
          {...register('id', {})}
          type={'text'}
          id={'id'}
          name={'id'}
          placeholder={'id'}
        />
        <label htmlFor={'token'}>Instance token</label>
        <input
          {...register('token', {})}
          type={'password'}
          id={'token'}
          name={'token'}
          placeholder={'token'}
        />
        <button className="login-form_button" type="submit">Login</button>
        <a href="https://console.green-api.com/auth/register" target="_blank" rel="noopener noreferrer">Register</a>
      </form>
    </div>
  );
}
