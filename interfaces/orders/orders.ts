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