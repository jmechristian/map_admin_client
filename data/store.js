import { configureStore, combineReducers } from '@reduxjs/toolkit';
import pinReducer from './pinSlice';
import userReducer from './userSlice';

const rootReducer = combineReducers({
  pin: pinReducer,
  user: userReducer,
});

export default configureStore({
  reducer: rootReducer,
});
