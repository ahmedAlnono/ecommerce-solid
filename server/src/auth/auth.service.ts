import * as argon from "argon2";
import { FindeUserDto } from "src/user/dto/find-user.dto";
import { ConfigService } from "@nestjs/config";
import { Injectable, Inject, ForbiddenException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "src/models/user.model";
import { USER_MODEL } from "constants/constants";
import { CreateUser } from "src/user/dto/create-user.dto";
@Injectable()
export class AuthService {
  constructor(
    @Inject(USER_MODEL)
    private user: typeof User,
    private jwt: JwtService,
    private configService: ConfigService
  ) {}
  async signin(user: FindeUserDto) {
    const findeUser = await this.user.findByPk(user.id);
    if (findeUser) {
      if (argon.verify(findeUser.hash, user.password)) {
        return this.signToken(findeUser.id, findeUser.email, user.password);
      } else {
        throw new ForbiddenException("wrong password");
      }
    } else {
      throw new ForbiddenException("user not found");
    }
  }
  async signup(user: CreateUser) {
    try {
      const create_user = await this.user.create({
        name: user.name,
        email: user.email,
        hash: user.password,
        photo: user.photo,
      });
      return this.signToken(create_user.id, user.email, user.password);
    } catch (e) {
      throw new ForbiddenException("wrong user data");
    }
  }
  async signToken(userId: number, email: string, password: string) {
    const payload = {
      sub: userId,
      email,
      password,
    };
    const token = await this.jwt.signAsync(payload, {
      secret: this.configService.get("AUTH_SECRET"),
    });
    return {
      access_token: token,
    };
  }
  async validateUser(sub: number, email: string, password): Promise<any> {
    const user = await this.user.findOne({
      where: {
        id: sub,
      },
    });
    if (user && (await argon.verify(user.hash, password))) {
      return user;
    }
    return false;
  }
}
