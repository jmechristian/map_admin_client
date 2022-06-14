import { configureStore } from '@reduxjs/toolkit';
import pinReducer from './pinSlice';
import { useReducer } from 'react';

export default configureStore({
  reducer: pinReducer,
  user: useReducer,
});
