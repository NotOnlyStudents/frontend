import {
  CartProduct,
} from 'interfaces/products/product';
import faker from 'faker';
import CartService from './CartService';

export default class CartServiceMock implements CartService {
  getCartProducts = async (): Promise<CartProduct[]> => new Array(10).fill(0).map(() => ({
    id: faker.datatype.uuid(),
    name: faker.random.word(),
    image: faker.random.image(),
    quantity: faker.datatype.number({ max: 10 }),
    discount: faker.datatype.number({ min: 0, max: 100 }),
    price: parseFloat(faker.commerce.price(0, 100)),
  }));
}
