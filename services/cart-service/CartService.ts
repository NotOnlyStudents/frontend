//import React from "react";
import {Cart} from "interfaces/cart";
import {Product} from "interfaces/products/product";

interface CartService{
    getCartItems():Promise<Cart>;
  }
  
export default CartService;