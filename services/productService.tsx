import HTTPRequest from 'lib/HTTPRequest';
import { PLPProductItem, Product, ProductFilter, ProductsGETRequest } from 'interfaces/products/product';
import queryString from "query-string"

const getAllProduct = async (params?: ProductFilter): Promise<PLPProductItem[]> => {
  const req: HTTPRequest = new HTTPRequest(`products`);
  let query: string = queryString.stringify(params);

  if(query) { query = `?${query}` }
  
  const res: ProductsGETRequest = await req.get<ProductsGETRequest>(query);

  return res.products
};

const getProductById = async (id: string): Promise<Product> => {
  const req: HTTPRequest = new HTTPRequest(`prodcuts/${id}`);
  const res: Product = await req.get<Product>();

  return res;
}

const getCategories = async (): Promise<Category[]> => {
  const req: HTTPRequest = new HTTPReq
}
export {
    getAllProduct,
    getProductById,
}
