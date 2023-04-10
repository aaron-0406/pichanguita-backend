import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('api/v0/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   *
   * @param loginDto
   * @returns
   */
  @Post('signin')
  @HttpCode(HttpStatus.OK)
  async signin(@Body() loginDto: LoginDto) {
    return await this.authService.signIn(loginDto);
  }

  /**
   *
   * @param RegisterDto
   * @returns
   */
  @Post('signup')
  @HttpCode(HttpStatus.OK)
  async signun(@Body() RegisterDto: RegisterDto) {
    return await this.authService.signUp(RegisterDto);
  }
}
