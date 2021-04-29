import HTTPRequest from 'lib/HTTPRequest';
import {
  CartProduct,
} from 'interfaces/products/product';
import { CartGETRequest } from 'interfaces/cart/cart-request';
import CartService from './CartService';

class CartServiceFetch implements CartService {
  getCartProducts = async (): Promise<CartProduct[]> => {
    const req: HTTPRequest = new HTTPRequest('cart');
    const res: CartGETRequest = await req.get<CartGETRequest>();

    return res.data;
  };
}

export default CartServiceFetch;
