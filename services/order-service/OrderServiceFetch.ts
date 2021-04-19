import HTTPRequest from 'lib/HTTPRequest';
import {
    OrderFilter, Order, OrdersGetRequest,
} from 'interfaces/orders/orders';
import queryString from 'query-string';
// import { CategoriesGETRequest, Category } from 'interfaces/products/category';

class OrderServiceFetch implements OrderService {
  getAllOrder = async (params?: OrderFilter): Promise<Order[]> => {
    const req: HTTPRequest = new HTTPRequest('orders');
    let query: string = queryString.stringify(params);
    
    if(query) { query = `?${query}`; }

    const res: OrdersGetRequest = await req.get<OrdersGetRequest>(query);

    return res.orders;
};

  getOrderById = async (id: string): Promise<Order> => {
    const req: HTTPRequest = new HTTPRequest(`orders/${id}`);
    const res: Order = await req.get<Order>();
  
    return res;
};
}
  
export default OrderServiceFetch;