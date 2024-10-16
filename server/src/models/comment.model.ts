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
export class Comment extends Model {
  @Column
  body: string;

  @Column({
    type: DataType.TINYINT,
    allowNull: false,
  })
  rate: number;

  @ForeignKey(() => User)
  userId: number;

  @ForeignKey(() => Product)
  productId: number;
}
