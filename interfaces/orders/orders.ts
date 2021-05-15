import { Address } from 'interfaces/address/address';
import { PLPProductItem } from 'interfaces/products/product';

/* export enum SortOrderType {
  'dataasc', 'datadesc',
} */

export interface OrderFilter {
  id?: string,
  offset?: number,
  // sort?: SortOrderType,
  start?: string,
  end?: string,
  email?: string,
}

export interface Order {
  id: string;
  customerEmail: string;
  address: Address;
  products: PLPProductItem[];
  additionalInfo: string;
  date?: string;
  status: OrderStatus;
}

export enum OrderStatus {
  new = 'new',
  fulfilled = 'fulfilled',
}

export interface OrderPaginator {
  total: number,
  orders: Order[]
}
