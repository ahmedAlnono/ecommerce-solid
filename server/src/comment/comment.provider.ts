import { COMMENT_MODEL, PRODUCT_MOEL, USER_MODEL } from "constants/constants";
import { Comment } from "src/models/comment.model";
import { Product } from "src/models/product.model";
import { User } from "src/models/user.model";

export const CommentProvider = [
  {
    provide: USER_MODEL,
    useValue: User,
  },
  {
    provide: PRODUCT_MOEL,
    useValue: Product,
  },
  {
    provide: COMMENT_MODEL,
    useValue: Comment,
  },
];
