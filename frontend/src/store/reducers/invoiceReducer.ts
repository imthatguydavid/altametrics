interface InvoiceState {
  invoices: any[];
}

const initialState: InvoiceState = {
  invoices: [],
};

const invoiceReducer = (state: InvoiceState = initialState, action: any): InvoiceState => {
  switch (action.type) {
    case 'ADD_INVOICE':
      return {
        ...state,
        invoices: [...state.invoices, action.payload],
      };
    default:
      return state;
  }
};

export default invoiceReducer;