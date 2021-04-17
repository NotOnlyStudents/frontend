import HTTPRequest from 'lib/HTTPRequest';
import {
  PLPProductItem, Product, ProductFilter,
} from 'interfaces/products/product';
import queryString from 'query-string';
import {
  ProductsDELETERequest, ProductsGETRequest, ProductsPATCHRequest, ProductsPOSTRequest,
} from 'interfaces/products/product-request';
import CartService from './CartService';
import { Cart } from 'interfaces/cart';

class CartServiceFetch implements CartService {
    getCartItems = async (): Promise<Cart> => {
        const req: HTTPRequest = new HTTPRequest(`cart/`);
        const res: Cart = await req.get<Cart>();
        return res;
    }
}


export default CartServiceFetch;
