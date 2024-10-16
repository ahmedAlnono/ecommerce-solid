import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { UserIdentity } from "src/get-user.decorator";
import { UserPayloadDto } from "src/user/dto/userPayload.dto";

@Controller("orders")
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(
    @Body() createOrderDto: CreateOrderDto,
    @UserIdentity() user: UserPayloadDto
  ) {
    return this.ordersService.create(createOrderDto, user.sub);
  }

  @Get()
  findAll(@UserIdentity() user: UserPayloadDto) {
    return this.ordersService.findAll(user);
  }

  @Get(":id")
  findOne(
    @Param("id", new ParseIntPipe()) id: number,
    @UserIdentity() user: UserPayloadDto
  ) {
    return this.ordersService.findOne(id, user);
  }

  @Patch("")
  update(
    @Body() updateOrderDto: UpdateOrderDto,
    @UserIdentity() user: UserPayloadDto
  ) {
    return this.ordersService.update(updateOrderDto, user);
  }

  @Delete(":id")
  remove(@Param("id") id: string, @UserIdentity() user: UserPayloadDto) {
    return this.ordersService.remove(+id, user);
  }

  @Post("complete/:id")
  complete(
    @Param("id", new ParseIntPipe()) id: number,
    @UserIdentity() user: UserPayloadDto
  ) {
    return this.ordersService.setCompleted(id, user);
  }
}
