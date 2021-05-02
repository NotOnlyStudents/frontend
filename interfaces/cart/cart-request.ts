import { CartProduct } from 'interfaces/products/product';

export interface CartGETRequest {
  data: CartProduct[];
}

export interface CartPostRequest{
  data: CartProduct[];
}

