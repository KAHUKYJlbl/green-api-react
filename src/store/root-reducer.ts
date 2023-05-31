import { combineReducers } from '@reduxjs/toolkit';

import { NameSpace } from '../utils/const/const';
import { userSlice } from './user/user-slice';
import { contactsSlice } from './contacts/contacts-slice';

export const rootReducer = combineReducers({
  [NameSpace.Contacts]: contactsSlice.reducer,
  [NameSpace.User]: userSlice.reducer,
  // [NameSpace.Chat]: chatSlice.reducer,
});
