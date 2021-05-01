<<<<<<< HEAD
import { PLPProductItem } from "interfaces/products/product";

export interface Address {
  id: string;
  nation: string;
  city: string;
  address: string;
  cap: number;
}

export enum SortOrderType {
  'dataasc', 'datadesc',
}
 
export interface OrderFilter {
  id?: string,
  offset?: number,
  sort?: SortOrderType
}
  
export interface Order {
  id: string;
  customerEmail: string;
  address: Address;
  products: PLPProductItem[];
  additionalInfo: string;
  date?: string;
  status: string;
}
  
export interface OrdersGetRequest {
  orders: Order[];
}
=======
import { Address } from 'interfaces/address/address';
import { PLPProductItem } from 'interfaces/products/product';

export enum SortOrderType {
  'dataasc', 'datadesc',
}

export interface OrderFilter {
  id?: string,
  offset?: number,
  sort?: SortOrderType
}

/* export interface OrderItem {
  id: string,
  name: string,
  quantity: number,
  image: string,
  price: string
} */

export interface Order {
  id: string;
  customerEmail: string;
  address: Address;
  // price: number;
  products: PLPProductItem[];
  additionalInfo: string;
  data?: Date;
  status: string;
}

export interface OrdersGetRequest {
  orders: Order[];
}
>>>>>>> 2f0f789a5e5f6dd16636d186ad4e46f42cb942c8
