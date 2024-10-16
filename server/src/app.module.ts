import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { ProductModule } from "./product/product.module";
import { APP_GUARD } from "@nestjs/core";
import { GlobalAuthGuard } from "./auth/auth.guard";
import { FilesModule } from "./files/files.module";
import { CommentModule } from "./comment/comment.module";
import { OrdersModule } from "./orders/orders.module";
import { DatabaseModule } from "./db/database.module";

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    UserModule,
    ProductModule,
    FilesModule,
    CommentModule,
    OrdersModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: GlobalAuthGuard,
    },
  ],
})
export class AppModule { }
