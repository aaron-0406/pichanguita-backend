import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { RolesModule } from './roles/roles.module';
import { UsersModule } from './users/users.module';
import { PermissionsModule } from './permissions/permissions.module';
import { FootbalFieldsModule } from './footbal-fields/footbal-fields.module';

@Module({
  imports: [
    AuthModule,
    RolesModule,
    UsersModule,
    PermissionsModule,
    FootbalFieldsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
