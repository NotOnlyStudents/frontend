import React from 'react';
// import EMLPagination from 'components/pagination/EMLPagination';
import { NextRouter, withRouter } from 'next/router';
import { Order, OrderFilter, OrderPaginator } from 'interfaces/orders/orders';
import OrderService from 'services/order-service';
import NoResultOrder from 'components/noresult/NoResultOrder';
import OrdersList from './OrdersList';
import OrderFilters from './OrderFilters';

interface Props {
  router: NextRouter,
  filters: OrderFilter,
  orders: Order[],
  totalOrders: number,
  seller?: boolean,
}

interface State {
  filters: OrderFilter,
  orders: Order[],
  totalOrders: number,
}

class Orders extends React.Component<Props, State> {
  public static readonly limit = 4;

  constructor(props: Props) {
    super(props);

    this.state = {
      filters: {
        // offset: 0,
        // sort?: SortOrderType,
        start: '',
        end: '',
        email: '',
        ...props.filters,
      },
      orders: props.orders,
      totalOrders: props.totalOrders,
    };
  }

  handleChangeFilters = async (filters: OrderFilter) => {
    const { router } = this.props;

    const query = {
      ...router.query,
    };

    if (filters.email) {
      query.email = filters.email;
    } else {
      delete query.email;
    }

    if (filters.start) {
      query.start = filters.start.toString();
    } else {
      delete query.start;
    }

    if (filters.end) {
      query.end = filters.end.toString();
    } else {
      delete query.end;
    }

    // filters.offset = 0;
    // query.offset = filters.offset.toString();

    router.push({
      pathname: '',
      query,
    }, null, {
      scroll: false,
    });

    this.setState({ filters });
    this.fetchAllOrder(query);
  };

  /* handleChangePagination = (offset: number) => {
    const { router } = this.props;

    const query = { ...router.query, offset: offset - 1 };

    router.push({
      pathname: '',
      query,
    }, null, {
      scroll: false,
    });
    this.setState((state) => {
      const newState: State = state;

      newState.filters.offset = offset - 1;

      return newState;
    });

    this.fetchAllOrder(query);
  }; */

  fetchAllOrder = async (query) => {
    let paginator: OrderPaginator;

    try {
      paginator = await (new OrderService()).getAllOrder(query);
    } catch (error) {
      paginator = {
        orders: [],
        total: 0,
      };
    }

    console.log(paginator.orders);
    this.setState({
      orders: paginator.orders,
      totalOrders: paginator.total,
    });
  };

  renderOrderIfThereAre = () => {
    const { seller } = this.props;
    const { orders } = this.state;

    return (
      orders.length !== 0
        ? (
          <OrdersList
            orders={orders}
            seller={seller}
          />
        )
        : <NoResultOrder />
    );
  };

  render(): React.ReactElement {
    const {
      seller,
    } = this.props;
    const {
      filters,
    } = this.state;
    return (
      <>
        <OrderFilters
          filter={filters}
          handleChangeFilter={this.handleChangeFilters}
          seller={seller}
        />
        {this.renderOrderIfThereAre()}
        {/* <EMLPagination
          totalElements={totalOrders}
          limit={Orders.limit}
          page={filters.offset + 1}
          handleChangePagination={this.handleChangePagination}
        /> */}
      </>
    );
  }
}

export default withRouter(Orders);
