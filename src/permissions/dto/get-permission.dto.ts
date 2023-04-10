import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class GetPermissionIdDto {
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  @IsInt()
  @IsPositive()
  id: number;
}
