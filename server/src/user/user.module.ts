import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { userProviders } from "./user.provider";
import { productProviders } from "src/product/product.provider";

@Module({
  controllers: [UserController],
  providers: [UserService, ...userProviders, ...productProviders],
})
export class UserModule {}
