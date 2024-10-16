import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
} from "@nestjs/common";
import { ORDER_MODEL, PRODUCT_MOEL, USER_MODEL } from "constants/constants";
import { Order } from "src/models/order.model";
import { Product } from "src/models/product.model";
import { User } from "src/models/user.model";
import { UserPayloadDto } from "src/user/dto/userPayload.dto";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";

@Injectable()
export class OrdersService {
  constructor(
    @Inject(ORDER_MODEL) private order: typeof Order,
    @Inject(USER_MODEL) private user: typeof User,
    @Inject(PRODUCT_MOEL) private product: typeof Product
  ) {}

  async create(createOrderDto: CreateOrderDto, userId: number) {
    const product = await this.product.findByPk(createOrderDto.productId, {
      attributes: ["photos", "price"],
    });
    await this.order
      .create({
        productId: createOrderDto.productId,
        quantity: createOrderDto.quantity,
        userId,
        photo: product.photos[0],
        price: +product.price * +createOrderDto.quantity,
      })
      .catch((e) => {
        console.log(e);
        throw new BadRequestException("order not created");
      });
    return true;
  }

  async findAll(user: UserPayloadDto) {
    const orders = await this.order
      .findAll({
        where: {
          userId: user.sub,
        },
      })
      .catch(() => {
        throw new BadRequestException("cann't find order");
      });
    return orders;
  }

  async findOne(id: number, user: UserPayloadDto) {
    const order = await this.order.findByPk(id);
    if (+order.userId === user.sub) {
      return order;
    }
    throw new BadRequestException("cann't get this order");
  }

  async update(updateOrderDto: UpdateOrderDto, user: UserPayloadDto) {
    const order = await this.order.findByPk(updateOrderDto.orderId);
    if (+order.userId === user.sub) {
      await order.$set("quantity", updateOrderDto.quantity).catch(() => {
        throw new ForbiddenException("unknown error");
      });
      return true;
    }
  }

  async remove(id: number, user: UserPayloadDto) {
    await this.order
      .destroy({
        where: {
          id,
          userId: user.sub,
        },
      })
      .catch(() => {
        throw new BadRequestException("not deleted");
      });
  }

  async setCompleted(id: number, user: UserPayloadDto) {
    await this.order
      .update(
        {
          completed: true,
        },
        {
          where: {
            id,
            userId: user.sub,
          },
        }
      )
      .catch(() => {
        throw new BadRequestException("order not completed");
      });
  }
}
