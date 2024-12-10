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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button.tsx";
import useAuth from '@/hooks/useAuth';

const InvoiceDashboard: React.FC = () => {
  const { data: invoices, isLoading, isError, error } = useInvoices();
  const { logout } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {(error as Error).message}</div>;
  }

  return (
    <div className="flex justify-center flex-col items-center">
      <div className="w-full max-w-[80%] mx-auto mb-8">
        <Dialog>
          <Table className="w-full">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Invoice ID</TableHead>
                <TableHead>Vendor Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className='text-right'>Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice: any) => (
                <Dialog key={invoice.id}>
                  <DialogTrigger asChild>
                  <TableRow>
                    <TableCell className="font-medium">{invoice.id}</TableCell>
                    <TableCell>{invoice.vendorName}</TableCell>
                    <TableCell>{invoice.description}</TableCell>
                    <TableCell>{invoice.dueDate}</TableCell>
                    <TableCell>{invoice.paid ? 'Paid' : 'Open'}</TableCell>
                    <TableCell className="text-right">${invoice.amount}</TableCell>
                  </TableRow>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>{invoice.vendorName} - {invoice.id}</DialogTitle>
                      <DialogDescription>
                        {invoice.description}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <h6 className="text-right text-sm">
                          Amount Due
                        </h6>
                        <p className="col-span-3">${invoice.amount}</p>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <h6 className="text-right text-sm">
                          Due Date
                        </h6>
                        <p className="col-span-3">{invoice.dueDate}</p>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <h6 className="text-right text-sm">
                          Status
                        </h6>
                        <p className="col-span-3">{invoice.paid ? 'Paid' : 'Open'}</p>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              ))}
            </TableBody>
          </Table>
        </Dialog>
      </div>
      <Button className="w-1/4 " onClick={()=>logout()}>Log Out</Button>
    </div>
  );
};

export default InvoiceDashboard;