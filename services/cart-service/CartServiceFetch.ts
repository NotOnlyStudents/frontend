import HTTPRequest from 'lib/HTTPRequest';
import {
  CartProduct,
} from 'interfaces/products/product';
import { CartGETRequest, CartPostRequest } from 'interfaces/cart/cart-request';
import CartService from './CartService';

class CartServiceFetch implements CartService {
  getCartProducts = async (token): Promise<CartProduct[]> => {
    const req: HTTPRequest = new HTTPRequest('cart');
    const headers = {
      "Authorization": "Bearer " + token,
      "Content-type": "application/json"
  }
    const res: CartGETRequest = await req.get<CartGETRequest>('',headers);
    return res.data;
  };

  /*postCartProducts = async (token): Promise<CartProduct[]> => {
    const req: HTTPRequest = new HTTPRequest('cart');
    const body = {
      "Authorization": "Bearer " + token,
      "Content-type": "application/json"
  }
    const res = await req.post<CartPostRequest>(token);
    return res.data;
  };*/
}

export default CartServiceFetch;
