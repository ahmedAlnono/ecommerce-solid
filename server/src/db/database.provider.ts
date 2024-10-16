import { ConfigService } from "@nestjs/config";
import { Sequelize } from "sequelize-typescript";
import { User } from "src/models/user.model";
import { Product } from "src/models/product.model";
import { Comment } from "src/models/comment.model";
import { Order } from "src/models/order.model";

export const databaseProviders = [
  {
    inject: [ConfigService],
    provide: "SEQUELIZE",
    useFactory: async (configService: ConfigService) => {
      const sequelize = new Sequelize({
        dialect: "postgres",
        host: configService.get<string>("DB_HOST"),
        port: configService.get<number>("DB_PORT"),
        username: configService.get<string>("USERNAME"),
        password: configService.get<string>("PASSWORD"),
        database: configService.get<string>("DB_DATABASE"),
      });
      sequelize.addModels([User, Product, Comment, Order]);
      return sequelize;
    },
  },
];
