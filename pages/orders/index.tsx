import React from 'react';
import OrderService from 'services/order-service';
import { Order, OrderFilter, OrderPaginator } from 'interfaces/orders/orders';
// import PLPFilter from 'components/plp/PLPFilter';
import EMLPagination from 'components/pagination/EMLPagination';
import OrdersList from 'components/orders/OrdersList';
import Head from 'next/head';
import { NextRouter, withRouter } from 'next/router';
import EMLBreadcrumb from 'components/breadcrumb/EMLBreadcrumb';
import HomeIcon from '@material-ui/icons/Home';
import { BreadcrumbPath } from 'interfaces/breadcrumb';
import { getHomeLink } from 'lib/links';
import { Typography } from '@material-ui/core';

interface Props {
  router: NextRouter,
  filters: OrderFilter,
  orders: Order[],
  totalOrders: number,
  error: boolean
}

interface State {
  filters: OrderFilter,
  orders: Order[],
  totalOrders: number
}

class OrderCustomer extends React.Component<Props, State> {
  private static limit = 5;

  breadcrumbPaths: BreadcrumbPath[] = [
    { name: 'Home', href: getHomeLink(), icon: HomeIcon },
    { name: 'Orders List Page' },
  ];

  constructor(props: Props) {
    super(props);

    this.state = {
      filters: props.filters,
      orders: props.orders,
      totalOrders: props.totalOrders,
    };
  }

  handleChangeFilters = (filters: OrderFilter) => {
    this.setState({ filters });
  };

  handleChangePagination = (offset: number) => {
    const { router } = this.props;

    router.push({
      pathname: '/orders',
      query: { ...router.query, offset },
    });
    this.setState({ filters: { offset } });
  };

  render(): React.ReactElement {
    const { filters, orders, totalOrders } = this.state;

    return (
      <>
        <Head>
          <title>Orders List Page | EmporioLambda</title>
        </Head>
        <EMLBreadcrumb paths={this.breadcrumbPaths} />
        <Typography variant="h4" component="h2">
          Your orders
        </Typography>
        <OrdersList orders={orders} />
        <EMLPagination
          totalElements={totalOrders}
          limit={OrderCustomer.limit}
          page={filters.offset + 1}
          handleChangePagination={this.handleChangePagination}
        />
      </>
    );
  }
}

export async function getServerSideProps({ query }) {
  const filters: OrderFilter = query;

  let paginator: OrderPaginator;
  let error = false;

  try {
    paginator = await (new OrderService()).getAllOrder(filters);
  } catch (e) {
    paginator = {
      orders: [],
      total: 0,
    };
    error = true;
  }
  return {
    props: {
      filters,
      orders: paginator.orders,
      total: paginator.total,
      error,
    },
  };
}

export default OrderCustomer;
