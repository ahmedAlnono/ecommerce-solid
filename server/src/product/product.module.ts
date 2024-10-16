import { Module } from "@nestjs/common";
import { ProductService } from "./product.service";
import { ProductController } from "./product.controller";
import { productProviders } from "./product.provider";
import { MulterModule } from "@nestjs/platform-express";
import { userProviders } from "src/user/user.provider";

@Module({
  imports: [
    MulterModule.register({
      dest: "./src/files/uploads",
    }),
  ],
  controllers: [ProductController],
  providers: [ProductService, ...productProviders, ...userProviders],
})
export class ProductModule { }
