import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { UserModule } from "src/user/user.module";
import { PassportModule } from "@nestjs/passport";
import { userProviders } from "src/user/user.provider";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: "supper-secret",
      signOptions: { expiresIn: "80d" },
    }),
    UserModule,
    PassportModule,
    ConfigModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, ...userProviders, JwtService, ConfigService],
})
export class AuthModule {}
