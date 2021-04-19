import faker from 'faker';
import {
  Order, OrderFilter,
} from 'interfaces/orders/orders';
import OrderService from './OrderService';

class OrderServiceMock implements OrderService {
  const getAllOrder = async (params?: OrderFilter): Promise<Order[]> => (
    (new Array(10)).fill(0)).map(
    (): Order => ({
      id: faker.datatype.uuid(),
      customerEmail: faker.internet.email(),
      price: parseFloat(faker.commerce.price()),
      address: faker.fake(
        id: faker.datatype.uuid();
        nation: faker.address.country();
        city: faker.address.city();
        address: faker.address.streetAddress();
        cap: faker.address.zipCode();
      ),
      products: faker.fake(
          id: faker.datatype.uuid(),
          name: faker.datatype.string(),
          description: faker.datatype.string(),;
          images: faker.random.image(),
          quantity: faker.datatype.number();
          price: faker.datatype.number();
          evidence: faker.datatype.boolean();
          discount: daker.datatype.number();
          categories: ['a','b'];
        ),
      additionalInfo: faker.datatype.string(),
      data: faker.datatype.datatime(),
      status: faker.datatype.string(),
    }
    ),
  );

  getOrderById = async (id: string): Promise<Order> => ({
    id: faker.datatype.uuid(),
    customerEmail: faker.internet.email(),
    address: faker.fake(
        id: faker.datatype.uuid();
        nation: faker.address.country();
        city: faker.address.city();
        address: faker.address.streetAddress();
        cap: faker.address.zipCode();
      ),
    price: parseFloat(faker.commerce.price()),
    products: faker.fake(
        id: faker.datatype.uuid(),
        name: faker.datatype.string(),
        description: faker.datatype.string(),;
        images: faker.random.image(),
        quantity: faker.datatype.number();
        price: faker.datatype.number();
        evidence: faker.datatype.boolean();
        discount: daker.datatype.number();
        categories: ['a','b'];
      ),
    additionalInfo: faker.datatype.string(),
    data: faker.datatype.datetime(),
    status: faker.datatype.string(),
  });
  
}

export default OrderServiceMock;
