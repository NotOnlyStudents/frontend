import HTTPRequest from 'lib/HTTPRequest';
import {
  CartProduct,
} from 'interfaces/products/product';
import { CartGETRequest } from 'interfaces/cart/cart-request';
import CartService from './CartService';

class CartServiceFetch implements CartService {
  getCartProducts = async (token): Promise<CartProduct[]> => {
    const req: HTTPRequest = new HTTPRequest('cart');
    const res: CartGETRequest = await req.get<CartGETRequest>();
    //token NON SO DOVE VADA, HEADERS? PARAMS?
    return res.data;
  };
}

export default CartServiceFetch;
