import React from 'react';
import { useInvoices } from '@/hooks/useInvoices.ts';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

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
    <div className="flex justify-center">
      <div className="w-full max-w-[80%]">
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Invoice ID</TableHead>
              <TableHead>Vendor Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice: any) => (
              <TableRow key={invoice.id}>
                <TableCell className="font-medium">{invoice.id}</TableCell>
                <TableCell>{invoice.vendorName}</TableCell>
                <TableCell>{invoice.description}</TableCell>
                <TableCell className="text-right">{invoice.amount}</TableCell>
                <TableCell>{invoice.dueDate}</TableCell>
                <TableCell>{invoice.paid ? 'Paid' : 'Open'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default InvoiceDashboard;