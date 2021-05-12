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

class CartServiceFetch implements CartService {
  getCartProducts = async (token): Promise<CartProduct[]> => {
    if (token === '') {
      const empty: [] = [];
      return empty;
    }
    const req: HTTPRequest = new HTTPRequest(process.env.NEXT_PUBLIC_CART_SERVICE_URL, 'cart');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const res = await req.get<CartGETRequest>('', headers);
    // res.data['token']['data']['products']['images'][0];

    return res.data.token.data.products.map(productToCartProduct);
  };

  getCartToken = async (token): Promise<CartToken> => {
    const req: HTTPRequest = new HTTPRequest(process.env.NEXT_PUBLIC_CART_SERVICE_URL, 'cart');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const res = await req.get<CartGETRequest>('', headers);
    // res.data['token']['data']['products']['images'][0];
    return res.data;
  };

  postCartProducts = async (token, product: Product): Promise<void> => {
    if (token === '') {
      const oldStorage = localStorage.getItem('item');
      let newStorage = '';
      oldStorage !== null ? newStorage = `${oldStorage + JSON.stringify(product)},` : newStorage = `${JSON.stringify(product)},`;
      localStorage.setItem('item', newStorage);
    }
    else{
      const req: HTTPRequest = new HTTPRequest(process.env.NEXT_PUBLIC_CART_SERVICE_URL, 'cart');

      const timeout = new Date();
      timeout.setMinutes(timeout.getMinutes() + 5);
      const date = {
        token: {
          data: {
            id: product.id,
            name: product.name,
            description: product.description,
            images: product.images,
            quantity: product.quantity,
            price: product.price,
            evidence: product.evidence,
            category: product.categories,
          },
          timeout,
        },
      };
      const hmac = createHmac('sha256', 'password').update(JSON.stringify(date)).digest('base64');

      const dateComplete = {
        token: {
          data: {
            id: product.id,
            name: product.name,
            description: product.description,
            images: product.images,
            quantity: product.quantity,
            price: product.price,
            evidence: product.evidence,
            category: product.categories,
          },
          timeout,
        },
        hmac,
      };

      const body = JSON.stringify(dateComplete);
      const headers = {
        'Content-type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      };

      try {
        await req.post<Product>(body, headers);
        // console.log(res);
      } catch (error) {
        console.log(error);
      }
    }
  };

  deleteCartProducts = async (token, productId): Promise<void> => {
    if (token === '') {
      if (localStorage != null) {
        let storage = localStorage.getItem('item');
        if (storage[storage.length - 1] === ',') {
          storage = storage.slice(0, -1);
        }
        storage = `[${storage}]`;
        const products = JSON.parse(storage);

        for (let i = 0; i < products.length; i++) {
          if (products[i].id === productId) {
            products.splice(i, 1);
          }
        }
        if (products.length !== 0) {
          localStorage.setItem('item', JSON.stringify(products).slice(0, -1).slice(1));
        } else {
          localStorage.removeItem('item');
        }
      }
    }
    else{
    const req: HTTPRequest = new HTTPRequest(process.env.NEXT_PUBLIC_CART_SERVICE_URL, `cart/${productId}`);
    const headers = {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    };
    const res = await req.delete<CartPatchRequest>('', headers);}
  };

  patchCartProducts = async (token, productId, quantity): Promise<void> => {
    if (token === '') {
      let storage = localStorage.getItem('item');
      if (localStorage != null) {
        if (storage[storage.length - 1] === ',') {
          storage = storage.slice(0, -1);
        }
        storage = `[${storage}]`;
        const products = JSON.parse(storage);

        for (let i = 0; i < products.length; i++) {
          if (products[i].id === productId) {
            products[i].quantity = quantity;
          }
        }
        localStorage.setItem('item', JSON.stringify(products).slice(0, -1).slice(1));
      }
    }
    else
    {
      const req: HTTPRequest = new HTTPRequest(process.env.NEXT_PUBLIC_CART_SERVICE_URL, `cart/${productId}`);
      const bodyString = JSON.stringify({ quantity });
      const headers = {
        Authorization: `Bearer ${token}`,
      };
  
      await req.patch<CartPatchRequest>(bodyString, headers);
    }
  };
}

export default CartServiceFetch;