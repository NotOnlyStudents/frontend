import faker from 'faker';
import {
  PLPProductItem, Product, ProductFilter,
} from 'interfaces/products/product';

class ProductServiceMock {
  getAllProduct = async (params?: ProductFilter): Promise<PLPProductItem[]> => (
    (new Array(10)).fill(0)).map(
    (): PLPProductItem => ({
      id: faker.datatype.uuid(),
      name: faker.commerce.productName(),
      price: parseFloat(faker.commerce.price()),
      image: faker.random.image(),
      discount: faker.datatype.number({ min: 0, max: 100 }),
      evidence: faker.datatype.boolean(),
      quantity: faker.datatype.number({ min: 0 }),
    }
    ),
  );

  getProductById = async (id: string): Promise<Product> => ({
    id: faker.datatype.uuid(),
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    images: ['https://picsum.photos/id/0/5616/3744', 'https://picsum.photos/id/1/5616/3744', 'https://picsum.photos/id/10/2500/1667', 'https://picsum.photos/id/100/2500/1656'],
    quantity: faker.datatype.number({ min: 0 }),
    price: parseFloat(faker.commerce.price()),
    evidence: faker.datatype.boolean(),
    discount: faker.datatype.number({ min: 0, max: 100 }),
    categories: ['a', 'b', 'c'],
  });
}

export default ProductServiceMock;
