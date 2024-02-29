import { configureStore } from '@reduxjs/toolkit';
import counterSlice from '../features/counterSlice';
// import authApi from './slices/authApi'; // Import your RTK Query API slice

export const store = configureStore({
  reducer: {
    counter:counterSlice,
    // auth: authApi.reducer,
  },
});