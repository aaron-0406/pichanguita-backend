import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { BcryptService } from 'src/bcrypt/bcrypt.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, BcryptService, PrismaService, JwtService],
})
export class UsersModule {}
