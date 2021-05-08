import HTTPRequest from 'lib/HTTPRequest';
import {
  CartProduct, Product,
} from 'interfaces/products/product';
import {
  CartGETRequest, CartPatchRequest, CartPostRequest, CartToken,
} from 'interfaces/cart/cart-request';
import { createHmac } from 'crypto';
import { productToCartProduct } from 'interfaces/products/product-converter';
import CartService from './CartService';

class CartServiceLocal implements CartService {
    getCartProducts(token: any): Promise<CartProduct[]> {
        throw new Error('Method not implemented.');
    }
    getCartToken(token: any): Promise<CartToken> {
        throw new Error('Method not implemented.');
    }
    postCartProducts(token: any, product: Product): Promise<void> {
        throw new Error('Method not implemented.');
    }
    patchCartProducts(token: any, productId: any, quantity: any): Promise<void> {
        throw new Error('Method not implemented.');
    }
    deleteCartProducts(token: any, productId: any): Promise<void> {
        throw new Error('Method not implemented.');
    }
}

export default CartServiceLocal;