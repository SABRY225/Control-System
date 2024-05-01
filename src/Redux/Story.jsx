import { configureStore } from '@reduxjs/toolkit';
import detailsReducer from './detailsSlice';
import controlReducer from './controlSlice';

const store = configureStore({
  reducer: {
    details: detailsReducer,
    control: controlReducer,
  },
});

export default store;
