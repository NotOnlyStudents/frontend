import React from 'react';
import { Order } from 'interfaces/products/product';
import OrderProduct from 'components/orders/OrderProduct';
import { Grid } from '@material-ui/core';

interface Props {
    orders: Order[];
}

function OrdersList({ orders }: Props): React.ReactElement {
    const renderAllOrders = (): React.ReactElement[] => orders.map(
        (order: Order): React.ReactElement => (
            <Grid key={order.id} item xs={12} sm={6} md={4} lg={3}>
                <OrderProduct order={order} />
            </Grid>
        ),
    );
    
    return ( 
    <Grid container spacing={3} justify="center" alignItems="center">
        {renderAllOrders()}
    </Grid>
    );
}

export default OrdersList;
