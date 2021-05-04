import { Order, OrderFilter, OrderPaginator } from 'interfaces/orders/orders';

interface OrderService {
  getAllOrder(params?: OrderFilter): Promise<OrderPaginator>;
  getAllOrderCustomer(email: string, params?: OrderFilter): Promise<OrderPaginator>;
  getOrderById(id: string): Promise<Order>;
}

export default OrderService;
