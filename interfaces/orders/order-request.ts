import { Order } from './orders';

export interface GetAllOrdersRequest {
    data: {
        total: number,
        orders: Order[]
    }
}

export interface GetOneOrderRequest {
    data: {
        token: {
            data: Order
        },
        timeout: string
    }
    hmac: string
}

export interface CreateOrderRequest {
    data: Order
}

export interface EditOrderRequest {
    data: Order
}

export interface DeleteOrderRequest{}