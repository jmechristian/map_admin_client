import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const pinSlice = createSlice({
  name: 'pins',
  initialState: {
    pin: null,
    allPins: null,
    selectedPin: null,
  },
  reducers: {
    setPin: (state, action) => {
      state.pin = action.payload;
    },
    setSelectedPin: (state, action) => {
      state.selectedPin = action.payload;
    },
    setAllPins: (state, action) => {
      state.allPins = action.payload;
    },
  },
});

export const { setPin, setAllPins, setSelectedPin } = pinSlice.actions;

export default pinSlice.reducer;
