import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from "class-validator";

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty()
  body: string;

  @IsNumber()
  @IsPositive()
  rate: number;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  userId?: number;

  @IsNumber()
  @IsPositive()
  productId: number;
}
