import { PLPProductItem, Product, ProductFilter } from 'interfaces/products/product';

interface ProductService {
  getAllProduct(params?: ProductFilter) : Promise<PLPProductItem[]>;
  getProductById(id: string) : Promise<Product>;
}

export default ProductService;
