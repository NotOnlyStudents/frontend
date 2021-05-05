import HTTPRequest from 'lib/HTTPRequest';
import {
  CartProduct, Product,
} from 'interfaces/products/product';
import { CartGETRequest, CartPatchRequest, CartPostRequest } from 'interfaces/cart/cart-request';
import CartService from './CartService';
import { createHmac } from 'crypto';


class CartServiceFetch implements CartService {
  getCartProducts = async (token): Promise<CartProduct[]> => {
    const req: HTTPRequest = new HTTPRequest('https://n4u3xypkqk.execute-api.eu-west-1.amazonaws.com/test','cart');
    const headers = {
      "Authorization": "Bearer " + token
      }
    const res = await req.get<CartGETRequest>('',headers);
   // res.data['token']['data']['products']['images'][0];
    return res.data['token']['data']['products'];
  }

  postCartProducts = async (token,product:Product): Promise<void> => {
    const req: HTTPRequest = new HTTPRequest('https://n4u3xypkqk.execute-api.eu-west-1.amazonaws.com/test','cart');

    const timeout = new Date();
    timeout.setMinutes(timeout.getMinutes() + 5);
    const date = {"token" : {
      "data":{
        "id": product.id,
        "name": product.name,
        "description": product.description,
        "images": product.images,
        "quantity" :product.quantity,
        "price" : product.price,
        "evidence": product.evidence,
        "category" :product.categories,
        },
        "timeout": timeout,
      },
    };
    const hmac= createHmac('sha256','password').update(JSON.stringify(date)).digest('base64');

    const dateComplete = {"token" : {
      "data":{
        "id": product.id,
        "name": product.name,
        "description": product.description,
        "images": product.images,
        "quantity" :product.quantity,
        "price" : product.price,
        "evidence": product.evidence,
        "category" :product.categories,
        },
        "timeout": timeout,
      },
      "hmac": hmac,
    }


    const body = JSON.stringify(dateComplete);
    const headers = {
      "Content-type": "application/json",
      "Accept": "application/json",
      "Authorization" : "Bearer " + token
    };

    try{
      const res = await req.post<Product>(body,headers);
      //console.log(res);
    }catch(error){
      console.log(error);
    }
  }

  patchCartProducts = async (token,productId,quantity): Promise<void> => {
    const req: HTTPRequest = new HTTPRequest('https://n4u3xypkqk.execute-api.eu-west-1.amazonaws.com/test/','cart/' + productId);
    const body = {quantity};
    const bodyString = JSON.stringify(body);
    const headers = {
      "Accept": "application/json",
      "Authorization": "Bearer " + token
      }
    const res = await req.patch<CartPatchRequest>(bodyString,headers);
  };
}



export default CartServiceFetch;
