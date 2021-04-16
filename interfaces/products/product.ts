import { Category } from '../categories/category';

export interface Product {
  id?: string;
  name: string;
  description: string;
  images: string[];
  quantity: number;
  price: number;
  evidence?: boolean;
  discount?: number;
  categories: Category[];
}

export interface PLPProductItem {
  id: string,
  name: string,
  price: number,
  image: string,
  evidence: boolean,
  discount: number,
  quantity: number
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

export interface ProductValidation {
  name: boolean;
  images: boolean;
  quantity: boolean;
  price: boolean;
  evidence: boolean;
  discount: boolean;
  categories: boolean;
}
