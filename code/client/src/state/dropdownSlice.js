import { createSlice } from '@reduxjs/toolkit';

const dropdownSlice = createSlice({
  name: 'dropdown',
  initialState: {
    clickedDropdown: null,
  },
  reducers: {
    setClickedDropdown: (state, action) => {
      state.clickedDropdown = action.payload;
    },
  },
});

export const { setClickedDropdown } = dropdownSlice.actions;
export const selectClickedDropdown = state => state.dropdown.clickedDropdown;

export default dropdownSlice.reducer;
