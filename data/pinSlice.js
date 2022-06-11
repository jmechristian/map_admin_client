import { createSlice } from '@reduxjs/toolkit';

export const pinSlice = createSlice({
  name: 'pins',
  initialState: {
    pin: null,
  },
  reducers: {
    setPin: (state, action) => {
      state.pin = action.payload;
    },
  },
});

export const { setPin } = pinSlice.actions;

export default pinSlice.reducer;
