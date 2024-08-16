import { configureStore } from '@reduxjs/toolkit';
import dashSlice from './features/dashboardSlice';

export const store = configureStore({
  reducer: {
    dashboard: dashSlice,
  },
});
