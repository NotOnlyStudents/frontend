import React from 'react';
import OrderService from 'services/order-service';
import { Order, OrderFilter } from 'interfaces/orders/orders';
// import PLPFilter from 'components/plp/PLPFilter';
import EMLPagination from 'components/pagination/EMLPagination';
import OrdersList from 'components/orders/OrdersList';
import Head from 'next/head';
import { NextRouter, withRouter } from 'next/router';
import EMLBreadcrumb from 'components/breadcrumb/EMLBreadcrumb';
import HomeIcon from '@material-ui/icons/Home';
import { BreadcrumbPath } from 'interfaces/breadcrumb';
import ProductService from 'services/product-service';

interface Props {
  router: NextRouter,
  filters: OrderFilter,
  orders: Order[],
  totalOrders: number
}

interface State {
  filters: OrderFilter,
  orders: Order[],
  totalOrders: number
}

class OrderCustomer extends React.Component<Props, State> {
  private static limit = 5;

  breadcrumbPaths: BreadcrumbPath[] = [
    { name: 'Home', href: '/', icon: HomeIcon },
    { name: 'Orders List Page' },
  ];

  constructor(props: Props) {
    super(props);

    this.state = {
      filters: { offset: 1 },
      orders: [],
      totalOrders: 0,
    };
  }

  componentDidMount() {
    this.setState((state: State) => {
      const { filters, orders, totalOrders } = this.props;

      const newState: State = {
        filters: { ...state.filters, ...filters },
        orders: [...state.orders, ...orders],
        totalOrders,
      };

      return newState;
    });
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
        <OrdersList orders={orders} />
        <EMLPagination
          totalElements={totalOrders}
          limit={OrderCustomer.limit}
          page={filters.offset}
          handleChangePagination={this.handleChangePagination}
        />
      </>
    );
  }
}

export async function getServerSideProps({ query }) {
  const filters: OrderFilter = query;

  let orders = [];
  try {
    orders = await (new OrderService()).getAllOrder(filters);
  } catch (error) {
    console.log();
  }
  console.log(orders);
  return {
    props: {
      filters,
      orders,
      totalProducts: 50,
    },
  };
}

export default OrderCustomer;
