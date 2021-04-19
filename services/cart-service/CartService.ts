import { CartProduct } from 'interfaces/products/product';

interface CartService{
  getCartProducts(): Promise<CartProduct[]>;
}

export default CartService;
