import { Category } from './category';

export interface Product {
  id: string;
  name: string;
  description: string;
  images: string[];
  quantity: number;
  price: string;
  evidence: boolean;
  discount: number;
  categories: Category[];
}

export interface PLPProductItem {
  id: string,
  name: string,
  price: string,
  image: string,
  evidence: string,
  discount: number,
  quantity: number
}

export interface ProductsGETRequest {
  products: PLPProductItem[]
}

export enum SortType {
  'alphaasc', 'pricedesc', 'priceasc',
}

export interface ProductFilter {
  text?: string,
  categories?: Category[],
  priceMax?: number,
  priceMin?: number,
  available?: boolean,
  evidance?: boolean,
  offset?: number,
  sort?: SortType
}
