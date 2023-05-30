import { combineReducers } from '@reduxjs/toolkit';

import { NameSpace } from '../utils/const/const';
import { userSlice } from './user/user-slice';

export const rootReducer = combineReducers({
  // [NameSpace.App]: appSlice.reducer,
  [NameSpace.User]: userSlice.reducer,
  // [NameSpace.Chat]: chatSlice.reducer,
});
