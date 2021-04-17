import HTTPRequest from 'lib/HTTPRequest';
import {
  PLPProductItem, Product, ProductFilter,
} from 'interfaces/products/product';
import queryString from 'query-string';
import {
  ProductsDELETERequest, ProductsGETRequest, ProductsPATCHRequest, ProductsPOSTRequest,
} from 'interfaces/products/product-request';
import CartService from './CartService';
import {Cart} from "interfaces/cart";
import faker from 'faker';



export default class CartServiceMock implements CartService {
    getCartItems = async (): Promise<Cart> => {
        const p:Product[] = [
            {
                name: faker.random.word(),
                description: faker.datatype.string(),
                images: null,
                quantity: faker.datatype.number({min:1,max:10}),
                price: parseFloat(faker.commerce.price()),
                categories: null
            },
            {
                name: faker.random.word(),
                description: faker.datatype.string(),
                images: null,
                quantity: faker.datatype.number({min:1,max:10}),
                price: parseFloat(faker.commerce.price()),
                categories: null
            }
          ];
         // const x={[0]:p};
          const c: Cart ={ products:p };
          return c;
    }
}
  


