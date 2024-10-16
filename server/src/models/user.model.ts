import {
  BeforeCreate,
  Column,
  DataType,
  HasMany,
  IsEmail,
  Model,
  Scopes,
  Table,
  Unique,
} from "sequelize-typescript";
import { Op } from "sequelize";
import * as argon from "argon2";
import { Product } from "./product.model";
import { Order } from "./order.model";

@Scopes(() => ({
  deleted: {
    where: {
      deletedAt: {
        [Op.ne]: null,
      },
    },
  },
  active: {
    where: {
      deletedAt: null,
    },
  },
}))
@Table({
  paranoid: true,
  underscored: true,
})
export class User extends Model {
  @Column
  name: string;

  @Unique
  @IsEmail
  @Column
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  hash: string;

  @Column({ field: "deleted_by", type: DataType.STRING, allowNull: true })
  deletedBy: string;

  @Column
  photo: string;

  @BeforeCreate
  static async hashPassword(user: User) {
    user.hash = await argon.hash(user.hash);
  }

  @HasMany(() => Product)
  products: Product[];

  @HasMany(() => Order)
  orders: Order[];

  @Column({
    type: DataType.ARRAY(DataType.INTEGER),
  })
  rated: number[];

  @Column({
    type: DataType.ARRAY(DataType.INTEGER),
  })
  shopingCard: number[];

  @HasMany(() => Order)
  userOrders: number[];
}
