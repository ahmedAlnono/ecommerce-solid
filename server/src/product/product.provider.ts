import { PRODUCT_MOEL } from 'constants/constants';
import { Product } from 'src/models/product.model';

export const productProviders = [
  {
    provide: PRODUCT_MOEL,
    useValue: Product,
  },
];
