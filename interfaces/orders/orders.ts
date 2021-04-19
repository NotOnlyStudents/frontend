import { Product } from "interfaces/products/product";

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
  price: number;
  products: Product[];
  additionalInfo: string;
  data: Date;
  status: string;
}
  
export interface OrdersGetRequest {
  orders: Order[];
}