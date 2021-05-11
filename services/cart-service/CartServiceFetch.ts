import HTTPRequest from 'lib/HTTPRequest';
import {
  CartProduct, Product,
} from 'interfaces/products/product';
import {
  CartGETRequest, CartPatchRequest, CartToken,
} from 'interfaces/cart/cart-request';
import { createHmac } from 'crypto';
import { productToCartProduct } from 'interfaces/products/product-converter';
import CartService from './CartService';

class CartServiceFetch implements CartService {
  getCartProducts = async (token): Promise<CartProduct[]> => {
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

    await req.post<Product>(body, headers);
  };

  deleteCartProducts = async (token, productId): Promise<void> => {
    const req: HTTPRequest = new HTTPRequest(process.env.NEXT_PUBLIC_CART_SERVICE_URL, `cart/${productId}`);
    const headers = {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    };
    await req.delete<CartPatchRequest>('', headers);
  };

  patchCartProducts = async (token, productId, quantity): Promise<void> => {
    const req: HTTPRequest = new HTTPRequest(process.env.NEXT_PUBLIC_CART_SERVICE_URL, `cart/${productId}`);
    const bodyString = JSON.stringify({ quantity });
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    await req.patch<CartPatchRequest>(bodyString, headers);
  };
}

export default CartServiceFetch;
