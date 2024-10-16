import { IsString, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class FindeUserDto {
  @IsString()
  @IsNotEmpty()
  password: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  id: number;
}
