import { combineReducers } from 'redux';
import invoiceReducer from './invoiceReducer';
// Import other reducers if you have them

const rootReducer = combineReducers({
  invoices: invoiceReducer,
});

export default rootReducer;