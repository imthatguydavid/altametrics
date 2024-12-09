import { configureStore } from '@reduxjs/toolkit';
import invoiceReducer from './reducers/invoiceReducer';

const store = configureStore({
  reducer: {
    invoices: invoiceReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;