import HTTPRequest from 'lib/HTTPRequest';
import {
  PLPProductItem, Product, ProductFilter,
} from 'interfaces/products/product';
import queryString from 'query-string';
import {
  ProductsDELETERequest, ProductsGETRequest, ProductsPATCHRequest, ProductsPOSTRequest,
} from 'interfaces/products/product-request';
import ProductService from './ProductService';

class ProductServiceFetch implements ProductService {
  getAllProduct = async (params?: ProductFilter): Promise<PLPProductItem[]> => {
    const req: HTTPRequest = new HTTPRequest('products');
    let query: string = queryString.stringify(params);

    if (query) { query = `?${query}`; }

    const res: ProductsGETRequest = await req.get<ProductsGETRequest>(query);

    return res.data;
  };

  getProductById = async (id: string): Promise<Product> => {
    const req: HTTPRequest = new HTTPRequest(`prodcuts/${id}`);
    const res: Product = await req.get<Product>();

    return res;
  };

  createProduct = async (product: Product): Promise<Product> => {
    const req: HTTPRequest = new HTTPRequest('products');

    const body: string = JSON.stringify(product);

    const res: ProductsPOSTRequest = await req.post<ProductsPOSTRequest>(body);

    return res.data;
  };

  editProduct = async (id: string, product: Product): Promise<Product> => {
    const req: HTTPRequest = new HTTPRequest(`products/${id}`);

    const body: string = JSON.stringify(product);

    const res: ProductsPATCHRequest = await req.patch<ProductsPATCHRequest>(body);

    return res.data;
  };

  deleteProduct = async (id: string) : Promise<void> => {
    const req: HTTPRequest = new HTTPRequest(`products/${id}`);

    await req.delete<ProductsDELETERequest>();
  };
}

export default ProductServiceFetch;
