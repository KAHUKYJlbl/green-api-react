import { createSelector } from '@reduxjs/toolkit';

import { AuthorizationStatus, NameSpace } from '../../utils/const/const';
import { State } from '../../types/state/state';

export const getAuthStatus = createSelector(
  (state: State): AuthorizationStatus => state[NameSpace.User].authStatus,
  (status) => ({
    auth: status === AuthorizationStatus.Auth,
    noAuth: status === AuthorizationStatus.NoAuth,
    unknown: status === AuthorizationStatus.Unknown,
  })
);
