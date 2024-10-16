import { Controller, Get, Param, ParseIntPipe, Post } from "@nestjs/common";
import { UserIdentity } from "src/get-user.decorator";
import { UserPayloadDto } from "./dto/userPayload.dto";
import { UserService } from "./user.service";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get("")
  findAll() {
    return this.userService.findAll();
  }

  @Get("profile")
  Profile(@UserIdentity() user: UserPayloadDto) {
    return this.userService.Profile(user);
  }

  @Post("add/wish/:id")
  addToCard(
    @Param("id", new ParseIntPipe()) id: number,
    @UserIdentity() user: UserPayloadDto
  ) {
    return this.userService.addWhish(user, id);
  }
}
