import { Module } from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { OrdersController } from "./orders.controller";
import { orderProvider } from "./orders.provider";

@Module({
  controllers: [OrdersController],
  providers: [OrdersService, ...orderProvider],
})
export class OrdersModule { }
