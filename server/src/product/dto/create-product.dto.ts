import { UploadedFiles } from "@nestjs/common";
import {
  IsAlpha,
  IsArray,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";

export class createProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsArray()
  @IsString({ each: true })
  type: string[];

  @IsString()
  @IsNotEmpty()
  price: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  photos?: string[];
}
