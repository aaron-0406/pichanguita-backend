import { IsNotEmpty, Validate, isEmail, isMobilePhone } from 'class-validator';

function isEmailOrPhone(value: string) {
  return isEmail(value) || isMobilePhone(value);
}

export class LoginDto {
  @IsNotEmpty()
  @Validate(isEmailOrPhone)
  email: string;

  @IsNotEmpty()
  password: string;
}
