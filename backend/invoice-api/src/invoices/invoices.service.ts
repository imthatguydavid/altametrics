import {Injectable, NotFoundException} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class InvoicesService {
  constructor(private prisma: PrismaService) {}

  async getInvoices(userId: number) {
    return this.prisma.invoice.findMany({
      where: { user_id: userId },
    });
  }

  async getInvoiceById(userId: number, invoiceId: number) {
    const invoice = await this.prisma.invoice.findUnique({
      where: { id: invoiceId, user_id: userId },
    });

    if (!invoice) {
      throw new NotFoundException('Invoice not found');
    }

    return invoice;
  }

  async getTotalByDueDate(userId: number) {
    return this.prisma.invoice.groupBy({
      by: ['due_date'],
      where: { user_id: userId },
      _sum: {
        amount: true,
      },
      orderBy: {
        due_date: 'asc',
      },
    });
  }


}