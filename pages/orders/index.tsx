import React from 'react';
import OrderService from 'services/order-service';
import { Order, OrderFilter, OrderPaginator } from 'interfaces/orders/orders';
import EMLPagination from 'components/pagination/EMLPagination';
import OrdersList from 'components/orders/OrdersList';
import Head from 'next/head';
import { getSignedState } from 'lib/authContext';
import { NextRouter } from 'next/router';
import EMLBreadcrumb from 'components/breadcrumb/EMLBreadcrumb';
import HomeIcon from '@material-ui/icons/Home';
import { BreadcrumbPath } from 'interfaces/breadcrumb';
import { getHomeLink, getOrderLink } from 'lib/links';
import { Typography } from '@material-ui/core';
import { withSSRContext } from 'aws-amplify';
import { SignedState } from 'interfaces/login';
import OrderFilters from 'components/orders/OrderFilters';

interface Props {
  router: NextRouter,
  filters: OrderFilter,
  orders: Order[],
  totalOrders: number,
  error: boolean,
  signedState: SignedState,
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
        <OrderFilters
          filter={filters}
          handleChangeFilter={this.handleChangeFilters}
          seller={!!(SignedState.Seller)}
        />
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

export async function getServerSideProps(context) {
  const filters: OrderFilter = context.query;

  let paginator: OrderPaginator;
  let error = false;
  let token: string;
  const { Auth } = withSSRContext(context);
  let signedState: SignedState;
  try {
    const { signInUserSession } = await Auth.currentAuthenticatedUser();
    signedState = await getSignedState(signInUserSession);
    if (signedState === SignedState.Seller) {
      return {
        redirect: {
          destination: getOrderLink(true),
          permanent: false,
        },
      };
    }
    token = signInUserSession.idToken.jwtToken;
    try {
      paginator = await (new OrderService()).getAllOrder(token, filters);
    } catch (e) {
      console.error(e);
      paginator = {
        orders: [],
        total: 0,
      };
      error = true;
    }
  } catch (err) {
    console.log(err);
    signedState = SignedState.NotAuthenticated;
    paginator = {
      orders: [],
      total: 0,
    };
    error = true;
  }
  console.log(paginator);
  return {
    props: {
      filters,
      orders: paginator.orders,
      total: paginator.total,
      error,
      signedState,
    },
  };
}

export default OrderCustomer;
