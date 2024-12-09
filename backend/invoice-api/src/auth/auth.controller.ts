import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: { email: string; password: string }) {
    console.log('login request data:', loginDto);

    try {
      const result = await this.authService.login(loginDto.email, loginDto.password);
      console.log('Login successful, result:', result); // Log successful result
      return result;
    } catch (error) {
      console.error('Error during login:', error); // Log the error
      throw error; // Ensure the error is still thrown or handled appropriately
    }
  }
}