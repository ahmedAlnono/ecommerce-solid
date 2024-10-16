import { Inject, Injectable } from "@nestjs/common";
import { PRODUCT_MOEL, USER_MODEL } from "constants/constants";
import { User } from "src/models/user.model";
import { UserPayloadDto } from "./dto/userPayload.dto";
import { Product } from "src/models/product.model";

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_MODEL) private user: typeof User,
    @Inject(PRODUCT_MOEL) private product: typeof Product
  ) {}
  async findAll() {
    return await this.user.findAll({
      attributes: ["name", "photo"],
    });
  }
  async Profile(user: UserPayloadDto) {
    const products = await this.product.findAll({
      where: {
        userId: user.sub,
      },
    });
    const findUser = await this.user.findByPk(user.sub);
    return { products, findUser };
  }

  async addWhish(user: UserPayloadDto, id: number) {
    const query = `
      UPDATE users
      SET shoping_card = ARRAY_APPEND(shoping_card, ${id})
      where id = ${user.sub};`;

    await this.user.sequelize.query(query);
  }
}
