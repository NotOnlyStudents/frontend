import faker from 'faker';
import {
  Order, OrderFilter,
} from 'interfaces/orders/orders';
import { PLPProductItem } from 'interfaces/products/product';
import OrderService from './OrderService';

class OrderServiceMock implements OrderService {
  getAllOrder = async (params?: OrderFilter): Promise<Order[]> => (
    (new Array(10)).fill(0)).map(
    (): Order => ({
      id: faker.datatype.uuid(),
      customerEmail: faker.internet.email(),
      // price: parseFloat(faker.commerce.price()),
      address: {
        id: faker.datatype.uuid(),
        nation: 'Italy',
        city: 'Padua',
        address: 'Via di non so dove',
        cap: faker.datatype.number({ min: 1, max: 100 }),
      },
      products: (new Array(2)).fill(0).map((): PLPProductItem => ({
        id: faker.datatype.uuid(),
        name: faker.datatype.string(),
        image: 'https://picsum.photos/id/0/5616/3744',
        quantity: faker.datatype.number(),
        price: faker.datatype.number(),
        evidence: faker.datatype.boolean(),
        discount: faker.datatype.number(),
      })),
      additionalInfo: faker.datatype.string(),
      // data: faker.datatype.datetime(),
      status: faker.datatype.string(),
    }
    ),
  );

  getOrderById = async (id: string): Promise<Order> => ({
    id: faker.datatype.uuid(),
    customerEmail: faker.internet.email(),
    address: ({
      id: faker.datatype.uuid(),
      nation: 'Italy',
      city: 'Padua',
      address: 'Via di non so dove',
      cap: faker.datatype.number({ min: 1, max: 100 }),
    }
    ),
    products: (new Array(2)).fill(0).map((): PLPProductItem => ({
      id: faker.datatype.uuid(),
      name: faker.datatype.string(),
      image: faker.random.image(),
      quantity: faker.datatype.number(),
      price: faker.datatype.number(),
      evidence: faker.datatype.boolean(),
      discount: faker.datatype.number(),
    })),
    additionalInfo: faker.datatype.string(),
    // data: faker.datatype.datetime(),
    status: faker.datatype.string(),
  });
}

export default OrderServiceMock;
