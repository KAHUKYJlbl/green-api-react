import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { FetchStatus, NameSpace } from '../../utils/const/const';
import { checkNewContact } from './api-actions';

type InitialState = {
  contactsLoadingStatus: FetchStatus;
  contactsList: number[];
  currentContact: number;
}

const initialState: InitialState = {
  contactsLoadingStatus: FetchStatus.Idle,
  contactsList: [],
  currentContact: 0,
};

export const contactsSlice = createSlice({
  name: NameSpace.Contacts,
  initialState,
  reducers: {
    deleteContact: (state, action: PayloadAction<number>) => {
      state.contactsList = state.contactsList.filter((contact) => contact !== action.payload);
      if (action.payload === state.currentContact) {
        state.currentContact = 0;
      }
    },
    addContact: (state, action: PayloadAction<number>) => {
      if (!state.contactsList.includes(action.payload)) {
        state.contactsList = [...state.contactsList, action.payload];
      }
    },
    changeCurrentContact: (state, action: PayloadAction<number>) => {
      state.currentContact = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(checkNewContact.fulfilled, (state, action) => {
        state.contactsLoadingStatus = FetchStatus.Success;
        if (action.payload.existsWhatsapp) {
          state.contactsList = [...state.contactsList, action.payload.phoneNumber];
          state.currentContact = action.payload.phoneNumber;
        }
      })
      .addCase(checkNewContact.pending, (state) => {
        state.contactsLoadingStatus = FetchStatus.Pending;
      })
      .addCase(checkNewContact.rejected, (state) => {
        state.contactsLoadingStatus = FetchStatus.Failed;
      });
  }
});

export const {addContact, deleteContact, changeCurrentContact} = contactsSlice.actions;
