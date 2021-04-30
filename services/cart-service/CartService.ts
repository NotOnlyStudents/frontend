import { CartProduct } from 'interfaces/products/product';

interface CartService{
  getCartProducts(token): Promise<CartProduct[]>;
}

export default CartService;
