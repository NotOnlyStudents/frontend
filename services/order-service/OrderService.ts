import { Order, OrderFilter } from 'interfaces/orders/orders';

interface OrderService {
  getAllOrder(params?: OrderFilter): Promise<Order[]>;
  getOrderById(id: string): Promise<Order>;
}

export default OrderService;