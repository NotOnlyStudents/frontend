import { PLPProductItem, Product } from './product';

export interface ProductsGETRequest {
  data: PLPProductItem[]
}

export interface ProductsPOSTRequest {
  data: Product
}

export interface ProductsPATCHRequest {
  data: Product
}

export interface ProductsDELETERequest { }
