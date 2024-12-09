import {
  Controller,
  Get,
  UseGuards,
  Req,
  Param,
  BadRequestException,
  HttpException,
  HttpStatus
} from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('invoices')
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  @UseGuards(JwtAuthGuard)
  async getAllInvoices(@Req() req) {
    try {
      if (!req.user || !req.user.userId) {
        throw new HttpException('User not authorized', HttpStatus.UNAUTHORIZED);
      }

      const invoices = await this.invoicesService.getInvoices(req.user.userId);

      if (!invoices || invoices.length === 0) {
        throw new HttpException('No invoices found', HttpStatus.NOT_FOUND);
      }

      return invoices;

    } catch (error) {
      console.error(error);

      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('total')
  async getTotalAmountsByDueDate(@Req() req) {
    try {
      if (!req.user || !req.user.userId) {
        throw new HttpException('User not authorized', HttpStatus.UNAUTHORIZED);
      }

      const totalAmounts = await this.invoicesService.getTotalByDueDate(req.user.userId);

      if (!totalAmounts) {
        throw new HttpException('No data found', HttpStatus.NOT_FOUND);
      }

      return totalAmounts;

    } catch (error) {
      console.error(error);

      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getInvoiceById(@Req() req, @Param('id') id: string) {
    try {
      const invoiceId = parseInt(id, 10);

      if (isNaN(invoiceId)) {
        throw new BadRequestException('Invalid invoice ID');
      }

      if (!req.user || !req.user.userId) {
        throw new HttpException('User not authorized', HttpStatus.UNAUTHORIZED);
      }

      const invoice = await this.invoicesService.getInvoiceById(req.user.userId, invoiceId);

      if (!invoice) {
        throw new HttpException('Invoice not found', HttpStatus.NOT_FOUND);
      }
      return invoice;

    } catch (error) {
      console.error(error);

      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


}