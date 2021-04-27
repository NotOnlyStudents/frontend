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
  total: number,
  seller?: boolean
}

interface State {
  filters: ProductFilter,
  products: PLPProductItem[],
  total: number,
}

class PLP extends React.Component<Props, State> {
  public static readonly limit = 24;

  constructor(props: Props) {
    super(props);

    this.state = {
      filters: {
        offset: 0,
        categories: [],
        available: false,
        evidence: false,
        priceMin: 0,
        priceMax: 0,
        sort: SortType.alphabetical,
        ...props.filters,
      },
      products: props.products,
      total: props.total,
    };
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

    delete query.offset;

    router.push({
      pathname: '',
      query,
    });

    // this.setState({ filters });
    setTimeout(() => { router.reload(); }, 1000);
  };

  handleChangePagination = (offset: number) => {
    const { router } = this.props;

    router.push({
      pathname: '',
      query: { ...router.query, offset: offset - 1 },
    });
    // this.setState((state) => {
    //   const newState: State = state;

    //   newState.filters.offset = offset - 1;

    //   return newState;
    // });

    setTimeout(() => { router.reload(); }, 1000);
  };

  render(): React.ReactElement {
    const {
      seller,
    } = this.props;
    const {
      filters, products, total,
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
          totalElements={total}
          limit={PLP.limit}
          page={filters.offset + 1}
          handleChangePagination={this.handleChangePagination}
        />
      </>
    );
  }
}

export default withRouter(PLP);
