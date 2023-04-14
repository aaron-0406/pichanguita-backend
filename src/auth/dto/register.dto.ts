import { IsNotEmpty, Validate, isEmail, isMobilePhone } from 'class-validator';

function isEmailOrPhone(value: string) {
  return isEmail(value) || isMobilePhone(value);
}
export class RegisterDto {
  @IsNotEmpty()
  @Validate(isEmailOrPhone)
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  name: string;
}
