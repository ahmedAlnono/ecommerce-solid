import { IsNumber, IsOptional, IsPositive } from "class-validator";

export class UpdateOrderDto {
  @IsPositive()
  @IsNumber()
  quantity: number;

  @IsPositive()
  @IsNumber()
  orderId: number;
}
