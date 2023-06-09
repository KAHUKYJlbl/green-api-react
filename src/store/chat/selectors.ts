import { createSelector } from '@reduxjs/toolkit';

import { State } from '../../types/state/state';
import { FetchStatus, NameSpace } from '../../utils/const/const';
import { Message, Notification } from '../../types/chat/message';

export const getMessageList = (state: State): Message[] => state[NameSpace.Chat].messagesList;

export const getStoredNotification = (state: State): Notification | null => state[NameSpace.Chat].receivedNotification;

export const getChatLoadingStatus = createSelector(
  (state: State): FetchStatus => state[NameSpace.Chat].chatLoadingStatus,
  (status) => ({
    isLoading: [FetchStatus.Idle, FetchStatus.Pending].includes(status),
    isSuccess: status === FetchStatus.Success,
    isFailed: status === FetchStatus.Failed,
  })
);
