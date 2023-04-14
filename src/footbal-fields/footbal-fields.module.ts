import { Module } from '@nestjs/common';
import { FootbalFieldsService } from './footbal-fields.service';
import { FootbalFieldsController } from './footbal-fields.controller';

@Module({
  controllers: [FootbalFieldsController],
  providers: [FootbalFieldsService]
})
export class FootbalFieldsModule {}
