import HTTPRequest from 'lib/HTTPRequest';
import {
  CartProduct,
} from 'interfaces/products/product';
import { CartGETRequest, CartPostRequest } from 'interfaces/cart/cart-request';
import CartService from './CartService';
import { createHmac } from 'crypto';


class CartServiceFetch implements CartService {
  getCartProducts = async (token): Promise<CartProduct[]> => {
    const req: HTTPRequest = new HTTPRequest('cart');
    const headers = {
      "Authorization": "Bearer " + token,
      "Content-type": "application/json"
  }
    const res = await req.get<CartGETRequest>('',headers);
   // console.log(res.data['token']['data']);
    return res.data['token']['data']['products'];
  }

  postCartProducts = async (token): Promise<void> => {
    const req: HTTPRequest = new HTTPRequest('cart');
    /*const products:CartProduct[] = [{
        id: 'prova',
        name: 'prova'
    }];
    const cart:Cart = {products : products};*/

    
  

  const timeout = new Date();
  timeout.setMinutes(timeout.getMinutes() + 5);

  const body = {"token" :{
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
  //"hmac" : "Kro7OhBUR6u2kQnUt8NTv0qHorh3DcEYHvBKvd5X3ao=" 
  const bodys = JSON.stringify(body);
  const hmac = createHmac('sha256','password').update(JSON.stringify(body)).digest('base64');


  const headers = {
    "Content-type": "application/json",
    "Accept": "application/json",
    "Authorization": "Bearer " + token
}


console.log(hmac);
console.log(token);
console.log("                       ");
console.log(bodys);
  //console.log(headers);
  try{
    const res = await req.post<CartPostRequest>(bodys,headers);
    console.log(res.data);
    }catch(error){console.log(error);}
  };





  patchCartProducts = async (token): Promise<void> => {
    const req: HTTPRequest = new HTTPRequest('cart/{productId]');
    const body = {"quantity" : 14};
    const bodys = JSON.stringify(body);
    console.log(bodys);

    const headers = {
      "Content-type": "application/json",
      "Accept": "application/json",
      "Authorization": "Bearer " + token
      }

  try{
    const res = await req.patch<CartPostRequest>(bodys,headers);
    console.log(res.data);
    }catch(error){console.log(error);}
  };
}












export default CartServiceFetch;
