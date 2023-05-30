import { createSlice } from '@reduxjs/toolkit';

import { AuthorizationStatus, FetchStatus, NameSpace } from '../../utils/const/const';
import { checkAuthStatus } from './api-actions';

type InitialState = {
  userLoadingStatus: FetchStatus;
  authStatus: AuthorizationStatus;
}

const initialState: InitialState = {
  userLoadingStatus: FetchStatus.Idle,
  authStatus: AuthorizationStatus.Unknown,
};

export const userSlice = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {
    dropAuth: (state) => {
      state.authStatus = AuthorizationStatus.NoAuth;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(checkAuthStatus.fulfilled, (state) => {
        state.userLoadingStatus = FetchStatus.Success;
        state.authStatus = AuthorizationStatus.Auth;
      })
      .addCase(checkAuthStatus.pending, (state) => {
        state.userLoadingStatus = FetchStatus.Pending;
      })
      .addCase(checkAuthStatus.rejected, (state) => {
        state.userLoadingStatus = FetchStatus.Failed;
        state.authStatus = AuthorizationStatus.NoAuth;
      });
  }
});

export const {dropAuth} = userSlice.actions;
