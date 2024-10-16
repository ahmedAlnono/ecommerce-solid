import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { Product } from "./product.model";
import { User } from "./user.model";

@Table({
  paranoid: true,
  underscored: true,
})
export class Order extends Model {
  @Column
  quantity: number;

  @Column({
    type: DataType.TINYINT,
    defaultValue: 0,
  })
  status: number;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  completed: boolean;

  @Column({
    type: DataType.TEXT,
  })
  photo: string;

  @Column
  price: string;

  @ForeignKey(() => User)
  userId: number;

  @ForeignKey(() => Product)
  productId: number;
}
