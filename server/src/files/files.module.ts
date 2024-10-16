import { Module } from "@nestjs/common";
import { FilesService } from "./files.service";
import { FilesController } from "./files.controller";
import { productProviders } from "src/product/product.provider";
import { MulterModule } from "@nestjs/platform-express";
import { userProviders } from "src/user/user.provider";

@Module({
  imports: [
    MulterModule.register({
      dest: "./src/files/uploads",
    }),
  ],
  controllers: [FilesController],
  providers: [FilesService, ...productProviders, ...userProviders],
})
export class FilesModule {}
