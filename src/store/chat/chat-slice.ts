import { createSlice } from '@reduxjs/toolkit';

import { FetchStatus, NameSpace } from '../../utils/const/const';
import { getMessage, getMessages, sendMessage } from './api-actions';
import { Message } from '../../types/chat/message';

type InitialState = {
  chatLoadingStatus: FetchStatus;
  messagesList: Message[];
}

const initialState: InitialState = {
  chatLoadingStatus: FetchStatus.Idle,
  messagesList: [],
};

export const chatSlice = createSlice({
  name: NameSpace.Chat,
  initialState,
  reducers: {
    // changeCurrentContact: (state, action: PayloadAction<number>) => {
    //   state.currentContact = action.payload;
    // },
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

// export const {changeCurrentContact} = contactsSlice.actions;
