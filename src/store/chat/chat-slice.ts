import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { FetchStatus, NameSpace } from '../../utils/const/const';
import { getMessage, getMessages, getNotification, sendMessage } from './api-actions';
import { Message, Notification } from '../../types/chat/message';

type InitialState = {
  chatLoadingStatus: FetchStatus;
  messagesList: Message[];
  receivedNotification: Notification | null;
}

const initialState: InitialState = {
  chatLoadingStatus: FetchStatus.Idle,
  messagesList: [],
  receivedNotification: null,
};

export const chatSlice = createSlice({
  name: NameSpace.Chat,
  initialState,
  reducers: {
    pushNewMessage: (state, action: PayloadAction<Message>) => {
      state.messagesList = [action.payload, ...state.messagesList];
    },
    clearNotification: (state) => {
      state.receivedNotification = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(sendMessage.fulfilled, (state) => {
        state.chatLoadingStatus = FetchStatus.Success;
      })
      .addCase(sendMessage.pending, (state) => {
        state.chatLoadingStatus = FetchStatus.Pending;
      })
      .addCase(sendMessage.rejected, (state) => {
        state.chatLoadingStatus = FetchStatus.Failed;
      })
      .addCase(getNotification.fulfilled, (state, action) => {
        state.chatLoadingStatus = FetchStatus.Success;
        if (action.payload) {
          state.receivedNotification = action.payload;
        }
      })
      .addCase(getNotification.pending, (state) => {
        state.chatLoadingStatus = FetchStatus.Pending;
      })
      .addCase(getNotification.rejected, (state) => {
        state.chatLoadingStatus = FetchStatus.Failed;
      })
      .addCase(getMessage.fulfilled, (state, action) => {
        state.chatLoadingStatus = FetchStatus.Success;
        state.messagesList = [...state.messagesList, action.payload];
      })
      .addCase(getMessage.pending, (state) => {
        state.chatLoadingStatus = FetchStatus.Pending;
      })
      .addCase(getMessage.rejected, (state) => {
        state.chatLoadingStatus = FetchStatus.Failed;
      })
      .addCase(getMessages.fulfilled, (state, action) => {
        state.chatLoadingStatus = FetchStatus.Success;
        state.messagesList = action.payload;
      })
      .addCase(getMessages.pending, (state) => {
        state.chatLoadingStatus = FetchStatus.Pending;
      })
      .addCase(getMessages.rejected, (state) => {
        state.chatLoadingStatus = FetchStatus.Failed;
      });
  }
});

export const {pushNewMessage, clearNotification} = chatSlice.actions;
