import HTTPRequest from 'lib/HTTPRequest';
import { Product, ProductFilter, ProductsGETRequest } from 'interfaces/products/product';
import queryString from "query-string"

const getAllProduct = async (params?: ProductFilter): Promise<Product[]> => {
  const req: HTTPRequest = new HTTPRequest(`products`);
  const query: string = queryString.stringify(params);
  const res: ProductsGETRequest = await req.get<ProductsGETRequest>(query);

  return res.products
};

const getProductById = async (id: string): Promise<Product> => {
  const req: HTTPRequest = new HTTPRequest(`prodcuts/${id}`);
  const res: Product = await req.get<Product>();

  return res;
}

export {
    getAllProduct,
    getProductById,
}
