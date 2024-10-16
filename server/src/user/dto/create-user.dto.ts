import {
  IsAlpha,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";

export class CreateUser {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(10)
  @IsAlpha()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5, {
    message: "short password",
  })
  @MaxLength(20, {
    message: "long password",
  })
  password: string;

  @IsString()
  @IsOptional()
  photo?: string;
}
