import { generatePath } from 'react-router-dom';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError, AxiosInstance } from 'axios';
import { toast } from 'react-toastify';

import { AppDispatch, State } from '../../types/state/state';
import { APIRoute } from '../../utils/const/const';
import { getId, getToken } from '../../services/token';
import { Message, NewMessageData, MessagesRequestData, NewMessageResponceData, MessageRequestData, Notification } from '../../types/chat/message';

export const sendMessage = createAsyncThunk<NewMessageResponceData, NewMessageData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'Chat/sendMessages',
  async (newMessage, {extra: axios}) => {
    try {
      const {data} = await axios.post<NewMessageResponceData>(
        generatePath(APIRoute.SendMessage, {
          id: `waInstance${getId()}`,
          token: getToken(),
        }),
        newMessage
      );

      return data;
    } catch (err) {
      if (err instanceof AxiosError && err.response?.status !== 401) {
        toast.error('Message sending failed.');
      }
      throw err;
    }
  },
);

export const getNotification = createAsyncThunk<Notification, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'Chat/getNotification',
  async (_arg, {extra: axios}) => {
    try {
      const {data} = await axios.get<Notification>(
        generatePath(APIRoute.GetNotification, {
          id: `waInstance${getId()}`,
          token: getToken(),
        })
      );

      return data;
    } catch (err) {
      if (err instanceof AxiosError && (err.response?.status === 400 || err.response?.status === 404)) {
        toast.error('New message geting failed.');
      }
      throw err;
    }
  },
);

export const deleteNotification = createAsyncThunk<boolean, number, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'Chat/deleteNotification',
  async (receiptId, {extra: axios}) => {
    try {
      const {data} = await axios.delete<boolean>(
        generatePath(APIRoute.DeleteNotification, {
          id: `waInstance${getId()}`,
          token: getToken(),
          receiptId: receiptId.toString(),
        })
      );

      return data;
    } catch (err) {
      if (err instanceof AxiosError && err.response?.status !== 401) {
        toast.error('Notification deleting failed.');
      }
      throw err;
    }
  },
);

export const getMessage = createAsyncThunk<Message, MessageRequestData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'Chat/getMessage',
  async (messageRequest, {extra: axios}) => {
    try {
      const {data} = await axios.post<Message>(
        generatePath(APIRoute.GetMessage, {
          id: `waInstance${getId()}`,
          token: getToken(),
        }),
        messageRequest
      );

      return data;
    } catch (err) {
      if (err instanceof AxiosError && err.response?.status !== 401) {
        toast.error('Message geting failed.');
      }
      throw err;
    }
  },
);

export const getMessages = createAsyncThunk<Message[], MessagesRequestData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'Chat/getMessages',
  async (messagesRequest, {extra: axios}) => {
    try {
      const {data} = await axios.post<Message[]>(
        generatePath(APIRoute.GetMessages, {
          id: `waInstance${getId()}`,
          token: getToken(),
        }),
        messagesRequest
      );

      return data;
    } catch (err) {
      if (err instanceof AxiosError && err.response?.status !== 401) {
        toast.error('Messages geting failed.');
      }
      throw err;
    }
  },
);
