import { configureStore } from '@reduxjs/toolkit';
import detailsReducer from './detailsSlice';
import controlReducer from './controlSlice';
import authReducer from './authSlice';
import ProfileReducer from './ProfileSlice';

const store = configureStore({
  reducer: {
    Profile: ProfileReducer,
    auth: authReducer,
    details: detailsReducer,
    control: controlReducer,
    
  },
});

export default store;
