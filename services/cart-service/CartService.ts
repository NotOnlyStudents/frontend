import { CartProduct, Product } from 'interfaces/products/product';

interface CartService{
  getCartProducts(token): Promise<CartProduct[]>;
  postCartProducts(token,product:Product): Promise<void>;
  patchCartProducts(token,productId,quantity): Promise<void>;
}

export default CartService;
