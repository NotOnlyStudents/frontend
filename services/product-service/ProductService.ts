import { PLPProductItem, Product, ProductFilter } from 'interfaces/products/product';

interface ProductService {
  getAllProduct(params?: ProductFilter): Promise<PLPProductItem[]>;
  getProductById(id: string): Promise<Product>;
  createProduct(product: Product): Promise<Product>;
  editProduct(id: string, product: Product): Promise<Product>;
  deleteProduct(id: string): Promise<void>;
  addToEvidence(id: string): Promise<void>;
  removeFromEvidence(id: string): Promise<void>;
}

export default ProductService;
