import { IsEmail, IsNotEmpty, Matches } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty({ message: 'email is required' })
  @IsEmail({}, { message: 'email is not valid' })
  email!: string;

  @IsNotEmpty({ message: 'password is required' })
  @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{6,}$/, {
    message: 'password is not valid',
  })
  password!: string;
}

export class LoginDto extends RegisterDto {}
