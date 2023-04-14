import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { VerifyPhoneDto } from './dto/verify-phone.dto';

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
  async signUpEmail(@Body() RegisterDto: RegisterDto) {
    return await this.authService.signUp(RegisterDto);
  }

  /**
   *
   * @param RegisterDto
   * @returns
   */
  @Post('verify-phone')
  @HttpCode(HttpStatus.OK)
  async verifyCodePhone(@Body() VerifyPhoneDto: VerifyPhoneDto) {
    return await this.authService.verifyPhone(VerifyPhoneDto);
  }
}
