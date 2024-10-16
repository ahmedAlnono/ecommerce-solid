import {
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from "sequelize-typescript";
import { User } from "./user.model";
import { Comment } from "./comment.model";
import { Order } from "./order.model";

@Table({
  paranoid: true,
  underscored: true,
})
export class Product extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  userName: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description: string;

  @Column({
    type: DataType.ARRAY(DataType.STRING),
    allowNull: false,
  })
  type: string[];

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  })
  Active: boolean;

  @Column({
    type: DataType.ARRAY(DataType.STRING),
    allowNull: false,
  })
  photos: string[];

  @ForeignKey(() => User)
  userId: User;

  @Column({
    type: DataType.ARRAY(DataType.SMALLINT),
    allowNull: true,
  })
  ratings: number[];

  @Column({
    type: DataType.SMALLINT,
    allowNull: false,
  })
  price: string;

  @Column
  avarageRatings: number;

  @HasMany(() => Comment)
  comments: number[];

  @HasMany(() => Order)
  productOrders: number[];
}
