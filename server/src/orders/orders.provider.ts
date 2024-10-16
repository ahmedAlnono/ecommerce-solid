import { ORDER_MODEL, PRODUCT_MOEL, USER_MODEL } from "constants/constants";
import { Order } from "src/models/order.model";
import { Product } from "src/models/product.model";
import { User } from "src/models/user.model";

export const orderProvider = [
  {
    provide: ORDER_MODEL,
    useValue: Order,
  },
  {
    provide: USER_MODEL,
    useValue: User,
  },
  {
    provide: PRODUCT_MOEL,
    useValue: Product,
  },
];
