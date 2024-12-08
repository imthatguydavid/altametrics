import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { InvoicesModule } from './invoices/invoices.module';

@Module({
  imports: [AuthModule, PrismaModule, InvoicesModule],

})
export class AppModule {}