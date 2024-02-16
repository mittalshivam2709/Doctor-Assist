import { configureStore } from '@reduxjs/toolkit';
import dropdownReducer from './dropdownSlice';

const store = configureStore({
  reducer: {
    dropdown: dropdownReducer,
    // Add other reducers here if needed
  },
});

export default store;
