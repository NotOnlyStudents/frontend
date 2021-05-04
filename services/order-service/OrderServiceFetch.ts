import HTTPRequest from 'lib/HTTPRequest';
import {
  OrderFilter, Order, OrdersGetRequest, OrderPaginator,
} from 'interfaces/orders/orders';
import queryString from 'query-string';
// import { CategoriesGETRequest, Category } from 'interfaces/products/category';
import { GetAllOrdersRequest, GetOneOrderRequest } from 'interfaces/orders/order-request';
import OrderService from './OrderService';

class OrderServiceFetch implements OrderService {
  getAllOrder = async (params?: OrderFilter): Promise<OrderPaginator> => {
    const req: HTTPRequest = new HTTPRequest('orders');
    let query: string = queryString.stringify(params);

    if (query) { query = `?${query}`; }

    const res: GetAllOrdersRequest = await req.get<GetAllOrdersRequest>(query);

    const paginator: OrderPaginator = {
      orders: res.data.orders.map((order) => order),
      total: res.data.total,
    };

    return paginator;
  };

  getAllOrderCustomer = async (email: string, params?: OrderFilter): Promise<OrderPaginator> => {
    const req: HTTPRequest = new HTTPRequest(`orders/${email}`);
    let query: string = queryString.stringify(params);

    if (query) { query = `?${query}`; }

    const res: GetAllOrdersRequest = await req.get<GetAllOrdersRequest>(query);

    const paginator: OrderPaginator = {
      orders: res.data.orders.map((order) => order),
      total: res.data.total,
    };

    return paginator;
  };

  getOrderById = async (id: string): Promise<Order> => {
    const req: HTTPRequest = new HTTPRequest(`orders/${id}`);
    const res: GetOneOrderRequest = await req.get<GetOneOrderRequest>();

    return res.data.token.data;
  };
}

export default OrderServiceFetch;
