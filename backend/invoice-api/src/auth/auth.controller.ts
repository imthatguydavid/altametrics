import {
  Controller,
  Post,
  Body,
  BadRequestException,
  HttpException,
  HttpStatus
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: { email: string; password: string }) {
    try {
      if (!loginDto.email || !loginDto.password) {
        throw new BadRequestException('Email and password must be provided');
      }

      const result = await this.authService.login(loginDto.email, loginDto.password);

      console.log('Login successful, result:', result);
      return result;

    } catch (error) {
      console.error('Error during login:', error);

      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}