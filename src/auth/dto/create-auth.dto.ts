import {
  IsString,
  IsEmail,
  IsStrongPassword,
  MinLength,
  IsNumber,
  Min,
  IsBoolean,
  IsEnum,
} from 'class-validator';

export class CreateAuthDto {
  @IsString()
  @MinLength(3)
  name: string;
  @IsString()
  @MinLength(5)
  familya: string;
  @IsString()
  @IsEmail()
  @MinLength(8)
  email: string;
  @IsString()
  @IsStrongPassword()
  @MinLength(5)
  password: string;
  @IsNumber()
  @Min(7)
  phone_number: string;
}
