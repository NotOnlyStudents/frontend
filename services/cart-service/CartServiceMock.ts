import HTTPRequest from 'lib/HTTPRequest';
import {
  CartProduct,
  PLPProductItem, Product, ProductFilter,
} from 'interfaces/products/product';
import queryString from 'query-string';
import {
  ProductsDELETERequest, ProductsGETRequest, ProductsPATCHRequest, ProductsPOSTRequest,
} from 'interfaces/products/product-request';
import { Cart } from 'interfaces/cart';
import faker from 'faker';
import CartService from './CartService';

export default class CartServiceMock implements CartService {
  getCartItems = async (): Promise<Cart> => {
    const p: CartProduct[] = new Array(10).fill(0).map(() => ({
      id: faker.datatype.uuid(),
      name: faker.random.word(),
      image: faker.random.image(),
      quantity: faker.datatype.number({ max: 10 }),
      discount: faker.datatype.number({ min: 0, max: 100 }),
      price: parseFloat(faker.commerce.price(0, 100)),
    }));

    const c: Cart = { products: p };

    return c;
  };
}
