import { createSelector } from '@reduxjs/toolkit';

import { State } from '../../types/state/state';
import { FetchStatus, NameSpace } from '../../utils/const/const';

export const getContacts = (state: State): number[] => state[NameSpace.Contacts].contactsList;

export const getCurrentContact = (state: State): number => state[NameSpace.Contacts].currentContact;

export const getUserLoadingStatus = createSelector(
  (state: State): FetchStatus => state[NameSpace.Contacts].contactsLoadingStatus,
  (status) => ({
    isLoading: [FetchStatus.Idle, FetchStatus.Pending].includes(status),
    isSuccess: status === FetchStatus.Success,
    isFailed: status === FetchStatus.Failed,
  })
);
