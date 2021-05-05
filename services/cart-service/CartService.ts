import { CartProduct } from 'interfaces/products/product';

interface CartService{
  getCartProducts(token): Promise<CartProduct[]>;
  postCartProducts(token): Promise<void>;
  patchCartProducts(token): Promise<void>;
}

export default CartService;
