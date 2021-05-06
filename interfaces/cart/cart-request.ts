import { CartProduct } from 'interfaces/products/product';

export interface CartGETRequest {
  data: {
    token: {
      data: {
        products: CartProduct[]
      }
    },
    hmac: string
  },
  timeout: string
}

export interface CartPostRequest{
  data: CartProduct[];
}

export interface CartPatchRequest{
  data: number;
}
