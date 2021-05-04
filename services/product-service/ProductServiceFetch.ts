import HTTPRequest from 'lib/HTTPRequest';
import {
  PLPProductItem, Product, ProductFilter, ProductPaginator,
} from 'interfaces/products/product';
import queryString from 'query-string';
import {
  CreateProductRequest,
  DeleteProductRequest, EditProductRequest, GetAllProductsRequest, GetOneProductRequest,
} from 'interfaces/products/product-request';
import { productToPLPProductItem } from 'interfaces/products/product-converter';
import ProductService from './ProductService';

class ProductServiceFetch implements ProductService {
  getAllProduct = async (params?: ProductFilter): Promise<ProductPaginator> => {
    const req: HTTPRequest = new HTTPRequest(process.env.NEXT_PUBLIC_PRODUCTS_CATEGORIES_SERVICE_URL, 'products');
    const query: string = queryString.stringify(params);

    const res: GetAllProductsRequest = await req.get<GetAllProductsRequest>(query);

    const paginator: ProductPaginator = {
      products: res.data.products.map((product) => productToPLPProductItem(product)),
      total: res.data.total,
    };

    return paginator;
  };

  getProductById = async (id: string): Promise<Product> => {
    const req: HTTPRequest = new HTTPRequest(process.env.NEXT_PUBLIC_PRODUCTS_CATEGORIES_SERVICE_URL, `products/${id}`);

    const res: GetOneProductRequest = await req.get<GetOneProductRequest>();

    return res.data.token.data;
  };

  createProduct = async (product: Product): Promise<Product> => {
    const req: HTTPRequest = new HTTPRequest(process.env.NEXT_PUBLIC_PRODUCTS_CATEGORIES_SERVICE_URL, 'products');

    const body: string = JSON.stringify(product);

    const res: CreateProductRequest = await req.post<CreateProductRequest>(body);

    return res.data;
  };

  editProduct = async (id: string, product: Product): Promise<Product> => {
    const req: HTTPRequest = new HTTPRequest(process.env.NEXT_PUBLIC_PRODUCTS_CATEGORIES_SERVICE_URL, `products/${id}`);

    const body: string = JSON.stringify(product);

    console.log(product);

    const res: EditProductRequest = await req.patch<EditProductRequest>(body);

    console.log(res);

    return res.data;
  };

  deleteProduct = async (id: string) : Promise<void> => {
    const req: HTTPRequest = new HTTPRequest(process.env.NEXT_PUBLIC_PRODUCTS_CATEGORIES_SERVICE_URL, `products/${id}`);

    await req.delete<DeleteProductRequest>();
  };

  addToEvidence = async (id: string): Promise<void> => {
    const req: HTTPRequest = new HTTPRequest(process.env.NEXT_PUBLIC_PRODUCTS_CATEGORIES_SERVICE_URL, `products/${id}`);

    const body: string = JSON.stringify({ evidence: true });

    await req.patch<EditProductRequest>(body);
  };

  removeFromEvidence = async (id: string): Promise<void> => {
    const req: HTTPRequest = new HTTPRequest(process.env.NEXT_PUBLIC_PRODUCTS_CATEGORIES_SERVICE_URL, `products/${id}`);

    const body: string = JSON.stringify({ evidence: false });

    await req.patch<EditProductRequest>(body);
  };
}

export default ProductServiceFetch;
