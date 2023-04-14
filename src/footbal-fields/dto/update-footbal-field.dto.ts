import { PartialType } from '@nestjs/mapped-types';
import { CreateFootbalFieldDto } from './create-footbal-field.dto';

export class UpdateFootbalFieldDto extends PartialType(CreateFootbalFieldDto) {}
