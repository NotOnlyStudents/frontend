import HTTPRequest from 'lib/HTTPRequest';
import {
  CartProduct,
} from 'interfaces/products/product';
import { CartGETRequest, CartPatchRequest, CartPostRequest } from 'interfaces/cart/cart-request';
import CartService from './CartService';
import { createHmac } from 'crypto';


class CartServiceFetch implements CartService {
  getCartProducts = async (token): Promise<CartProduct[]> => {
    const req: HTTPRequest = new HTTPRequest('cart');
    const headers = {
      "Authorization": "Bearer " + token
      }
    const res = await req.get<CartGETRequest>('',headers);
   // console.log(res.data['token']['data']);
    return res.data['token']['data']['products'];
  }

  postCartProducts = async (token): Promise<void> => {


    //const req: HTTPRequest = new HTTPRequest('cart');
  /*  const products:CartProduct[] = [{
        id: 'prova',
        name: 'prova'
    }];
    const cart:Cart = {products : products};
*/
    
  /*

  const timeout = new Date();
  timeout.setMinutes(timeout.getMinutes() + 5);

  const dato = {"token" :{
    "data":{
      "id":"Provolone",
      "name":"Mozzarella",
      "description":"Mozzarella di Bufala",
      "images":["spugne"],
      "quantity" : 3,
      "price" : 14 ,
      "available":true,
      "evidence":true,
      "category" : ["spugne"]
      },
      "timeout": timeout
    },
  };
  console.log(timeout);
  //"hmac" : "Kro7OhBUR6u2kQnUt8NTv0qHorh3DcEYHvBKvd5X3ao=" 
  const hmac = createHmac('sha256','password').update(JSON.stringify(dato)).digest('base64');

  const datoss = {"token" :{
    "data":{
      "id":"Provolone",
      "name":"Mozzarella",
      "description":"Mozzarella di Bufala",
      "images":["spugne"],
      "quantity" : 3,
      "price" : 14 ,
      "available": true,
      "evidence": true,
      "category" : ["spugne"]
      },
      "timeout": timeout
    },
    "hmac": hmac
  }

  const body = JSON.stringify(datoss);

  const headers = {
    "Content-type": "application/json",
    "Accept": "application/json",
    "Authorization": "Bearer " + token
    };

  /*
  console.log(headers);
  console.log(body);
  try{
    const res = await req.post<CartPostRequest>(body,headers);
    }catch(error){console.log(error);}*/
  }

  patchCartProducts = async (token,productId,quantity): Promise<void> => {
    const req: HTTPRequest = new HTTPRequest('cart/' + productId);
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
