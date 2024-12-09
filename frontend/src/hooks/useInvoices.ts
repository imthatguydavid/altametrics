import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';

const formatDate = (isoString: string): string => {
  const date = new Date(isoString);
  return format(date, 'MMM d, yyyy');
};

const fetchInvoices = async () => {
  const token = localStorage.getItem('jwtToken');
  const response = await fetch('/api/invoices', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();

  // utility function to change from snake case to camel case would be nice here.

  return data.map((invoice: any) => ({
    ...invoice,
    dueDate: formatDate(invoice.due_date),
    vendorName: invoice.vendor_name,
    userId: invoice.user_id,
    amount: parseFloat(invoice.amount).toFixed(2),
  }));
};

export const useInvoices = () => {
  return useQuery({
    queryKey: ['invoices'],
    queryFn: fetchInvoices
  });
};