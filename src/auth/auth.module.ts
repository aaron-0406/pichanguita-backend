import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/prisma.service';
import { BcryptService } from 'src/bcrypt/bcrypt.service';
import { JwtService } from '@nestjs/jwt';
import { SmsService } from 'src/sms/sms.service';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    BcryptService,
    PrismaService,
    JwtService,
    SmsService,
  ],
})
export class AuthModule {}
