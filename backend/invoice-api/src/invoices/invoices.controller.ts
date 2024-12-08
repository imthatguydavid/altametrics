import {Controller, Get, Post, Body, UseGuards, Req, Param, BadRequestException} from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('invoices')
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllInvoices(@Req() req) {
    // Assume req.user contains the user info from JWT token
    return this.invoicesService.getInvoices(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('total')
  async getTotalAmountsByDueDate(@Req() req) {
    return this.invoicesService.getTotalByDueDate(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getInvoiceById(@Req() req, @Param('id') id: string) {
    const invoiceId = parseInt(id, 10);

    if (isNaN(invoiceId)) {
      throw new BadRequestException('Invalid invoice ID');
    }

    return this.invoicesService.getInvoiceById(req.user.userId, invoiceId);
  }


}