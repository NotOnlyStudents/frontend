import React from 'react';

import { PLPProductItem, ProductFilter } from 'interfaces/products/product';
import { getAllProduct } from 'services/productService';
import PLPFilter from 'components/plp/PLPFilter';
import EMLPagination from 'components/pagination/EMLPagination';
import PLPList from 'components/plp/PLPList';
import Head from 'next/head';
import { NextRouter, withRouter } from 'next/router';
import EMLBreadcrumb from 'components/breadcrumb/EMLBreadcrumb';
import HomeIcon from '@material-ui/icons/Home';
import { BreadcrumbPath } from 'interfaces/breadcrumb';
import { CircularProgress } from '@material-ui/core';

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
  private static limit = 25;

  breadcrumbPaths: BreadcrumbPath[] = [
    { name: 'Home', href: '/', icon: HomeIcon },
    { name: 'Product List Page' },
  ];

  constructor(props: Props) {
    super(props);

    this.state = {
      filters: { offset: 1, categories: [] },
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

      return newState;
    });
  }

  handleChangeFilters = async (filters: ProductFilter) => {
    const { router } = this.props;

    router.push({
      pathname: '',
      query: {
        ...router.query,
        categories: filters.categories,
      },
    }, undefined, { shallow: true });

    this.setState({ filters });
    this.fetchAllFilteredProducts();
  };

  handleChangePagination = (offset: number) => {
    const { router } = this.props;

    router.push({
      pathname: '',
      query: { ...router.query, offset },
    }, undefined, { shallow: true });
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

  console.log(query);

  if (query.categories) {
    if (!Array.isArray(query.categories)) {
      filters.categories = [query.categories];
    }
  }

  let products = [];
  try {
    products = await getAllProduct(filters);
  } catch (error) {
    console.log();
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
