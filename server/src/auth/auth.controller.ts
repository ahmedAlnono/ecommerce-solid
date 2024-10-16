import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUser } from "src/user/dto/create-user.dto";
import { FindeUserDto } from "src/user/dto/find-user.dto";
import { Request } from "express";
import { Public } from "src/public.decorator";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Public()
  @Post("signup")
  signup(@Body() user: CreateUser) {
    return this.authService.signup(user);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post("signin")
  signIn(@Body() signInDto: FindeUserDto) {
    return this.authService.signin(signInDto);
  }

  @Get("profile")
  profile(@Req() req: Request) {
    return req["user"];
  }
}
