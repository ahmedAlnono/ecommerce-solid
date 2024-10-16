import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
} from "@nestjs/common";
import { PRODUCT_MOEL, USER_MODEL } from "constants/constants";
import { Product } from "src/models/product.model";
import { createProductDto } from "./dto/create-product.dto";
import { Op } from "sequelize";
import { UserPayloadDto } from "src/user/dto/userPayload.dto";
import { User } from "src/models/user.model";

@Injectable()
export class ProductService {
  constructor(
    @Inject(PRODUCT_MOEL) private product: typeof Product,
    @Inject(USER_MODEL) private user: typeof User
  ) {}

  async findAll(user: UserPayloadDto) {
    return await this.product.findAll({
      limit: 50,
      order: [["id", "DESC"]],
      attributes: [
        "id",
        "name",
        "description",
        "price",
        "photos",
        "userName",
        "avarageRatings",
        "createdAt",
      ],
      where: {
        userId: {
          [Op.ne]: user.sub,
        },
      },
    });
  }

  async findOne(id: number) {
    const product = await this.product.findByPk(id);
    if (!product) {
      throw new BadRequestException("product not found");
    }
    return product;
  }

  async findType(type: string) {
    const query = `
    SELECT type, name
    FROM products
    where '${type}'=ANY(type);`;
    const products = await this.product.sequelize.query(query);
    return products;
  }

  async addProduct(
    data: createProductDto,
    user: UserPayloadDto,
    photos: Array<Express.Multer.File>
  ) {
    const userData = await this.user.findByPk(user.sub, {
      attributes: ["name"],
    });
    let photosArray: string[] = [];
    for (let i = 0; i < photos.length; i++) {
      photosArray.push(photos[i].filename);
    }
    data.photos = photosArray;
    await this.product
      .create({
        name: data.name,
        userName: userData.name,
        description: data.description,
        type: data.type,
        photos: data.photos,
        userId: user.sub,
        price: data.price,
      })
      .catch((e) => {
        console.log(e);
        throw new ForbiddenException("product not created");
      });
    return true;
  }

  async rateProduct(productId: number, rate: number) {
    const query = `
      UPDATE products
        SET ratings = ARRAY_APPEND(ratings, ${rate})
        WHERE id = ${productId};`;

    await this.product.sequelize.query(query).catch(() => {
      throw new ForbiddenException("sorry");
    });
    const product = await this.product.findByPk(productId).catch(() => {
      throw new BadRequestException("product not found");
    });
    const rateArray = product.ratings;
    if (product.avarageRatings) {
      const avarage =
        (product.avarageRatings * (rateArray.length - 1)) / rateArray.length +
        rate / rateArray.length;
      await this.product
        .update(
          {
            avarageRatings: avarage,
          },
          {
            where: {
              id: productId,
            },
          }
        )
        .catch(() => {
          throw new ForbiddenException("unknown error 1");
        });
      return true;
    } else {
      let sum = 0;
      for (let i = 0; i < rateArray.length; i++) {
        sum += rateArray[i];
      }
      const avarage = sum / rateArray.length;
      await this.product.update(
        {
          avarageRatings: avarage,
        },
        {
          where: {
            id: productId,
          },
        }
      );
      return true;
    }
  }

  async deleteProduct(id: number, user: UserPayloadDto) {
    const product = await this.product.findByPk(id);
    if (+product.userId !== user.sub) {
      throw new BadRequestException("not allowed");
    }
    await product.destroy();
  }

  async searchProduct(title: string) {
    const productsWithTitle = await this.product.findAll({
      where: {
        name: {
          [Op.iLike]: `%${title}%`,
        },
      },
    });
    return productsWithTitle;
  }
}
