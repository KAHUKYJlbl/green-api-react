import { generatePath } from 'react-router-dom';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError, AxiosInstance } from 'axios';
import { toast } from 'react-toastify';

import { AppDispatch, State } from '../../types/state/state';
import { APIRoute } from '../../utils/const/const';
import { getId, getToken } from '../../services/token';
import { CheckNewContactResponse, CheckNewContactResult, NewContactData } from '../../types/contacts/contacts';

export const checkNewContact = createAsyncThunk<CheckNewContactResult, NewContactData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'User/checkNewContact',
  async ({phoneNumber}, {extra: axios}) => {
    try {
      const {data: {existsWhatsapp}} = await axios.post<CheckNewContactResponse>(
        generatePath(APIRoute.Contact, {
          id: `waInstance${getId()}`,
          token: getToken(),
        }),
        {phoneNumber}
      );

      if (!existsWhatsapp) {
        toast.error('No WhatsApp for this number.');
      }

      return {existsWhatsapp, phoneNumber};
    } catch (err) {
      if (err instanceof AxiosError && err.response?.status !== 401) {
        toast.error('Contact check failed.');
      }
      throw err;
    }
  },
);
