import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
} from "@nestjs/common";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { COMMENT_MODEL, PRODUCT_MOEL, USER_MODEL } from "constants/constants";
import { Comment } from "src/models/comment.model";
import { User } from "src/models/user.model";
import { Product } from "src/models/product.model";

@Injectable()
export class CommentService {
  constructor(
    @Inject(COMMENT_MODEL) private comment: typeof Comment,
    @Inject(USER_MODEL) private user: typeof User,
    @Inject(PRODUCT_MOEL) private product: typeof Product
  ) {}

  async create(data: CreateCommentDto) {
    const product = await this.product.findByPk(data.productId, {
      attributes: ["id"],
    });
    if (!product) {
      throw new BadRequestException("product not found");
    }
    const query = `
    INSERT INTO comments (body, rate, product_id, user_id)
    VALUES ('${data.body}', ${data.rate}, ${data.productId}, ${data.userId});`;
    const comment = await this.comment.sequelize.query(query).catch(() => {
      throw new ForbiddenException("comment not created");
    });
    return true;
  }

  async getProductComments(productId: number) {
    const comments = await this.comment.findAll({
      where: {
        productId,
      },
    });
    if (!comments) {
      throw new BadRequestException("product don't have comments");
    }
    return comments;
  }

  async delete(id: number, userId: number) {
    try {
      const comment = await this.comment.findByPk(id);
      if (+comment.userId !== +userId) {
        throw new BadRequestException("not your comment");
      }
      await comment.destroy();
    } catch (e) {}
  }
}
