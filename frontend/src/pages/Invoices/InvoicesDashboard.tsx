import React from 'react';
import { useInvoices } from '../../hooks/useInvoices';

const InvoiceDashboard: React.FC = () => {
  const { data: invoices, isLoading, isError, error } = useInvoices();

  console.log('invoices:', invoices);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {(error as Error).message}</div>;
  }

  return (
    <div>
      <h1>Invoice List</h1>
      <table>
        <thead>
        <tr>
          <th>ID</th>
          <th>Date</th>
          <th>Vendor</th>
          <th>Amount</th>
          <th>Status</th>
        </tr>
        </thead>
        <tbody>
        {invoices.map((invoice: any) => (
          <tr key={invoice.id}>
            <td>{invoice.id}</td>
            <td>{invoice.dueDate}</td>
            <td>{invoice.vendorName}</td>
            <td>{invoice.amount}</td>
            <td>{invoice.description}</td>
            <td>{invoice.paid}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
};

export default InvoiceDashboard;