import React from 'react';

import { PLPProductItem, ProductFilter, SortType } from 'interfaces/products/product';
import ProductService from 'services/product-service';
import PLPFilter from 'components/plp/PLPFilter';
import EMLPagination from 'components/pagination/EMLPagination';
import PLPList from 'components/plp/PLPList';
import Head from 'next/head';
import { NextRouter, withRouter } from 'next/router';
import EMLBreadcrumb from 'components/breadcrumb/EMLBreadcrumb';
import HomeIcon from '@material-ui/icons/Home';
import { BreadcrumbPath } from 'interfaces/breadcrumb';

interface Props {
  router: NextRouter,
  filters: ProductFilter,
  products: PLPProductItem[],
  totalProducts: number
}

interface State {
  filters: ProductFilter,
  products: PLPProductItem[],
  totalProducts: number
}

class PLPCustomer extends React.Component<Props, State> {
  public static limit = 25;

  breadcrumbPaths: BreadcrumbPath[] = [
    { name: 'Home', href: '/', icon: HomeIcon },
    { name: 'Product List Page' },
  ];

  constructor(props: Props) {
    super(props);

    this.state = {
      filters: {
        offset: 1,
        categories: [],
        available: false,
        sort: SortType.alphabetical,
      },
      products: [],
      totalProducts: 0,
    };
  }

  componentDidMount() {
    this.setState(() => {
      const newState: State = { ...this.props };

      if (!newState.filters.offset) {
        newState.filters.offset = 1;
      }

      if (!newState.filters.available) {
        newState.filters.available = false;
      }

      if (!newState.filters.sort) {
        newState.filters.sort = SortType.alphabetical;
      }

      return newState;
    });
  }

  handleChangeFilters = async (filters: ProductFilter) => {
    const { router } = this.props;

    const query = {
      ...router.query,
    };

    delete query.limit;

    if (filters.categories) {
      query.categories = filters.categories;
    }

    if (filters.available) {
      query.available = filters.available.toString();
    } else {
      delete query.available;
    }

    if (filters.sort !== SortType.alphabetical) {
      query.sort = filters.sort;
    } else {
      delete query.sort;
    }

    router.push({
      pathname: '/plp',
      query,
    });
    // }, undefined, { shallow: true });

    this.setState({ filters });
    this.fetchAllFilteredProducts();
  };

  handleChangePagination = (offset: number) => {
    const { router } = this.props;

    router.push({
      pathname: '/plp',
      query: { ...router.query, offset },
    });
    // }, undefined, { shallow: true });
    this.setState({ filters: { offset } });
    this.fetchAllFilteredProducts();
  };

  fetchAllFilteredProducts = () => {
    // this.setState({ loading: true });

    // const products = await getAllProduct(this.state.filters);

    // this.setState(() => ({ products, loading: false }));
  };

  render(): React.ReactElement {
    const {
      filters, products, totalProducts,
    } = this.state;

    return (
      <>
        <Head>
          <title>Products List Page | EmporioLambda</title>
        </Head>
        <EMLBreadcrumb paths={this.breadcrumbPaths} />
        <PLPFilter
          filter={filters}
          handleChangeFilter={this.handleChangeFilters}
        />
        <PLPList products={products} />
        <EMLPagination
          totalElements={totalProducts}
          limit={PLPCustomer.limit}
          page={filters.offset}
          handleChangePagination={this.handleChangePagination}
        />
      </>
    );
  }
}

export async function getServerSideProps({ query }) {
  const filters: ProductFilter = query;

  if (query.categories) {
    if (!Array.isArray(query.categories)) {
      filters.categories = [query.categories];
    }
  }

  if (query.available) {
    filters.available = query.available === 'true';
  }

  filters.limit = PLPCustomer.limit;

  let products = [];

  try {
    products = await (new ProductService()).getAllProduct(filters);
  } catch (error) {
    console.error(error);
  }

  return {
    props: {
      filters,
      products,
      totalProducts: 250,
    },
  };
}

export default withRouter(PLPCustomer);
