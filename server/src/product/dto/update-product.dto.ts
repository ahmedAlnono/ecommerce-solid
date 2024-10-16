import { IsArray, IsNotEmpty, IsString, ValidateNested } from "class-validator";

export class UpdateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsArray()
  @IsString({ each: true })
  type: string[];

  @IsArray()
  @IsString({ each: true })
  photos: string[];
}
