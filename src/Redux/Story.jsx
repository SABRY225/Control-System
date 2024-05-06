import { configureStore } from '@reduxjs/toolkit';
import detailsReducer from './detailsSlice';
import controlReducer from './controlSlice';
import authReducer from './authSlice';
import IdReducer from './ProfileSlice';
const store = configureStore({
  reducer: {
    id:IdReducer,
    auth: authReducer,
    details: detailsReducer,
    control: controlReducer,
  },
});

export default store;
