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
        const oldStorage=localStorage.getItem('item');
        var newStorage="";
        oldStorage!=null? newStorage=oldStorage+JSON.stringify(product)+"," : newStorage=JSON.stringify(product)+",";
        localStorage.setItem('item', newStorage);
        return;
    }
    patchCartProducts(token: any, productId: any, quantity: any): Promise<void> {
        if(localStorage!=null)
        {
            var storage = localStorage.getItem('item');
            if(storage[storage.length-1]==',')
            {
                storage = storage.slice(0,-1);
            }
            storage = '[' + storage + ']';
            const products = JSON.parse(storage);

            for(var i=0;i<products.length;i++)
            {
                if(products[i].id==productId)
                {
                    products[i].quantity=quantity;
                }
            }
            localStorage.setItem('item', JSON.stringify(products).slice(0,-1).slice(1));
        }
        return;
    }
    deleteCartProducts(token: any, productId: any): Promise<void> {
        if(localStorage!=null)
        {
            var storage = localStorage.getItem('item');
            if(storage[storage.length-1]==',')
            {
                storage = storage.slice(0,-1);
            }
            storage = '[' + storage + ']';
            const products = JSON.parse(storage);

            for(var i=0;i<products.length;i++)
            {
                if(products[i].id==productId)
                {
                    products.splice(i,1);
                }
            }
            if(products.length!=0)
            {
                localStorage.setItem('item', JSON.stringify(products).slice(0,-1).slice(1));
            }
            else
            {
                localStorage.removeItem('item');
            }
        }
        return;
    }
}

export default CartServiceLocal;