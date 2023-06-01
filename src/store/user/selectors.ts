import { createSelector } from '@reduxjs/toolkit';

import { AuthorizationStatus, FetchStatus, NameSpace } from '../../utils/const/const';
import { State } from '../../types/state/state';

export const getAuthStatus = createSelector(
  (state: State): AuthorizationStatus => state[NameSpace.User].authStatus,
  (status) => ({
    auth: status === AuthorizationStatus.Auth,
    noAuth: status === AuthorizationStatus.NoAuth,
    unknown: status === AuthorizationStatus.Unknown,
  })
);

export const getUserLoadingStatus = createSelector(
  (state: State): FetchStatus => state[NameSpace.User].userLoadingStatus,
  (status) => ({
    isLoading: [FetchStatus.Idle, FetchStatus.Pending].includes(status),
    isSuccess: status === FetchStatus.Success,
    isFailed: status === FetchStatus.Failed,
  })
);
