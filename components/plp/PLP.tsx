import React from 'react';

import { PLPProductItem, ProductFilter, SortType } from 'interfaces/products/product';
import ProductService from 'services/product-service';
import PLPFilter from 'components/plp/PLPFilter';
import EMLPagination from 'components/pagination/EMLPagination';
import PLPList from 'components/plp/PLPList';
import { NextRouter, withRouter } from 'next/router';

interface Props {
  router: NextRouter,
  filters: ProductFilter,
  products: PLPProductItem[],
  totalProducts: number,
  seller?: boolean
}

interface State {
  filters: ProductFilter,
  products: PLPProductItem[],
  totalProducts: number
}

class PLP extends React.Component<Props, State> {
  public static readonly limit = 25;

  constructor(props: Props) {
    super(props);

    this.state = {
      filters: {
        offset: 1,
        categories: [],
        available: false,
        evidence: false,
        priceMin: 0,
        priceMax: 0,
        sort: SortType.alphabetical,
      },
      products: [],
      totalProducts: 0,
    };
  }

  componentDidMount() {
    this.setState((state: State) => {
      const { filters, products, totalProducts } = this.props;

      const newState: State = {
        filters: { ...state.filters, ...filters },
        products: [...state.products, ...products],
        totalProducts,
      };

      return newState;
    });
  }

  handleChangeFilters = async (filters: ProductFilter) => {
    const { router } = this.props;

    const query = {
      ...router.query,
    };

    if (filters.categories) {
      query.categories = filters.categories;
    }

    if (filters.available) {
      query.available = filters.available.toString();
    } else {
      delete query.available;
    }

    if (filters.evidence) {
      query.evidence = filters.evidence.toString();
    } else {
      delete query.evidence;
    }

    if (filters.priceMin) {
      query.priceMin = filters.priceMin.toString();
    } else {
      delete query.priceMin;
    }

    if (filters.priceMax) {
      query.priceMax = filters.priceMax.toString();
    } else {
      delete query.priceMax;
    }

    if (filters.sort !== SortType.alphabetical) {
      query.sort = filters.sort;
    } else {
      delete query.sort;
    }

    router.push({
      pathname: '',
      query,
    }, undefined, { shallow: true });

    this.setState({ filters });
    this.fetchAllFilteredProducts();
  };

  handleChangePagination = (offset: number) => {
    const { router } = this.props;

    router.push({
      pathname: '',
      query: { ...router.query, offset },
    });
    this.setState((state: State) => {
      const newState: State = state;

      newState.filters.offset = offset;

      return newState;
    });
    this.fetchAllFilteredProducts();
  };

  fetchAllFilteredProducts = () => {
    // this.setState({ loading: true });

    // const products = await getAllProduct(this.state.filters);

    // this.setState(() => ({ products, loading: false }));
  };

  render(): React.ReactElement {
    const {
      seller,
    } = this.props;
    const {
      filters, products, totalProducts,
    } = this.state;

    return (
      <>
        <PLPFilter
          filter={filters}
          handleChangeFilter={this.handleChangeFilters}
          seller={seller}
        />
        <PLPList
          products={products}
          seller={seller}
        />
        <EMLPagination
          totalElements={totalProducts}
          limit={PLP.limit}
          page={filters.offset}
          handleChangePagination={this.handleChangePagination}
        />
      </>
    );
  }
}

export default withRouter(PLP);
