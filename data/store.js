import { configureStore, combineReducers } from '@reduxjs/toolkit';
import pinReducer from './pinSlice';
import userReducer from './userSlice';
import filterReducer from './filterSlice';

const rootReducer = combineReducers({
  pin: pinReducer,
  user: userReducer,
  filter: filterReducer,
});

export default configureStore({
  reducer: rootReducer,
});
