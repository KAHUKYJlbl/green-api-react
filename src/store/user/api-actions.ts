import { generatePath } from 'react-router-dom';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError, AxiosInstance } from 'axios';
import { toast } from 'react-toastify';

import { AppDispatch, State } from '../../types/state/state';
import { APIRoute, AuthorizationStatus } from '../../utils/const/const';
import { User } from '../../types/user/user';

export const checkAuthStatus = createAsyncThunk<AuthorizationStatus, User, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'User/checkAuthStatus',
  async (user, {extra: axios}) => {
    try {
      const {data} = await axios.get<AuthorizationStatus>(generatePath(
        APIRoute.Login, {
          id: `waInstance${user.id}`,
          token: user.token,
        }
      ));
      return data;
    } catch (err) {
      if (err instanceof AxiosError && err.response?.status !== 401) {
        toast.error('Login check failed.');
      }
      throw err;
    }
  },
);
