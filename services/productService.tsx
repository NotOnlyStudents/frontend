import HTTPRequest from 'lib/HTTPRequest';
import { Product, ProductsGETRequest } from 'interfaces/products/product';

const getAllProduct = async (): Promise<Product[]> => {
  const req: HTTPRequest = new HTTPRequest('products');
  const res: ProductsGETRequest = await req.get<ProductsGETRequest>();
  
  return res.products
};

export {
    getAllProduct,
}
