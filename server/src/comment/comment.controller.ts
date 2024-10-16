import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from "@nestjs/common";
import { CommentService } from "./comment.service";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { UserIdentity } from "src/get-user.decorator";
import { UserPayloadDto } from "src/user/dto/userPayload.dto";

@Controller("comment")
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get(":id")
  getProductCommnets(@Param("id", new ParseIntPipe()) productId: number) {
    return this.commentService.getProductComments(productId);
  }

  @Post()
  CreateComment(
    @Body() data: CreateCommentDto,
    @UserIdentity() user: UserPayloadDto,
  ) {
    console.log(user);
    data["userId"] = user.sub;
    console.log(data);
    return this.commentService.create(data);
  }

  @Delete(":id")
  deleteComment(
    @Param("id", new ParseIntPipe()) id: number,
    @UserIdentity() user: UserPayloadDto,
  ) {
    return this.commentService.delete(id, user.sub);
  }
}
