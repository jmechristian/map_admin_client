import { createSlice } from '@reduxjs/toolkit';

export const filterSlice = createSlice({
  name: 'filters',
  initialState: {
    allThePins: null,
    filteredPins: null,
    department: '',
    subcategories: ['Multi-Family', 'Single-Family', 'Rowhomes', 'Commercial'],
    selectedSubcategories: null,
  },
  reducers: {
    setFilteredPins: (state, action) => {
      state.allThePins = action.payload;
    },
    setDepartment: (state, action) => {
      state.department = action.payload;
    },
    setSubcategories: (state, action) => {
      state.selectedSubcategories = action.payload;
    },
    getFilteredPins: (state) => {
      if (state.selectedSubcategories === null) {
        return;
      } else {
        let pins = state.selectedSubcategories.map((category) =>
          state.allThePins.filter(
            (proj) =>
              proj.attributes.subcategory.data != null &&
              proj.attributes.subcategory.data.attributes.subcategory ===
                category
          )
        );

        state.filteredPins = pins.flat();
      }
    },
    clearAllFilters: (state) => {
      state.filteredPins = null;
      state.department = '';
      state.selectedSubcategories = null;
    },
  },
});

export const {
  setDepartment,
  setSubcategories,
  setFilteredPins,
  getFilteredPins,
  clearAllFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
