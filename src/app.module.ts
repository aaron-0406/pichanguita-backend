import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { RolesModule } from './roles/roles.module';
import { UsersModule } from './users/users.module';
import { PermissionsModule } from './permissions/permissions.module';

@Module({
  imports: [AuthModule, RolesModule, UsersModule, PermissionsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
