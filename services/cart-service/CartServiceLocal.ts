import HTTPRequest from 'lib/HTTPRequest';
import {
  CartProduct, Product,
} from 'interfaces/products/product';
import {
  CartGETRequest, CartPatchRequest, CartPostRequest, CartToken,
} from 'interfaces/cart/cart-request';
import {Cart} from 'interfaces/cart/cart';
import { createHmac } from 'crypto';
import { productToCartProduct } from 'interfaces/products/product-converter';
import CartService from './CartService';
import faker from 'faker';
import { useCookies } from 'react-cookie';
import Cookies from 'universal-cookie';
import CartServiceFetch from './CartServiceFetch';
import { LocalSeeOutlined } from '@material-ui/icons';


class CartServiceLocal implements CartService {
    getCartProducts = async (token): Promise<CartProduct[]> =>{ 
        const empty: [] = [];
        return empty;
    }


    getCartToken(token: any): Promise<CartToken> {
        throw new Error('Method not implemented.');
    }
    postCartProducts(token: any, product: Product): Promise<void> {
        var oldStorage=localStorage.getItem('item');
        oldStorage=oldStorage+JSON.stringify(product)+",";
        localStorage.setItem('item', oldStorage);
        return;
    }
    patchCartProducts(token: any, productId: any, quantity: any): Promise<void> {
        throw new Error('Method not implemented.');
    }
    deleteCartProducts(token: any, productId: any): Promise<void> {
        throw new Error('Method not implemented.');
    }
}

export default CartServiceLocal;