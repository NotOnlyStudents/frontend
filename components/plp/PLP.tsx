import React from 'react';

import {
  PLPProductItem, ProductFilter, ProductPaginator, SortType,
} from 'interfaces/products/product';
import ProductService from 'services/product-service';
import PLPFilter from 'components/plp/PLPFilter';
import EMLPagination from 'components/pagination/EMLPagination';
import PLPList from 'components/plp/PLPList';
import { NextRouter, withRouter } from 'next/router';
import NoResultProduct from 'components/noresult/NoResultProduct';
import { AlertState } from 'interfaces/alert';
import SnackbarErrorRetrievingData, { errorRetrievingDataId } from 'components/snackbar/common-snackbar/SnackbarErrorRetrievingData';

interface Props {
  router: NextRouter,
  filters: ProductFilter,
  products: PLPProductItem[],
  total: number,
  seller?: boolean,
  error?: boolean
}

interface State {
  filters: ProductFilter,
  products: PLPProductItem[],
  total: number,
  alert: AlertState
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
      alert: {
        [errorRetrievingDataId]: props.error,
      },
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

    this.setState({ filters });

    this.fetchAllProducts(query);

    // setTimeout(() => { router.reload(); }, 1000);
  };

  handleChangePagination = (offset: number) => {
    const { router } = this.props;

    const query = { ...router.query, offset: offset - 1 };

    router.push({
      pathname: '',
      query,
    });
    this.setState((state) => {
      const newState: State = state;

      newState.filters.offset = offset - 1;

      return newState;
    });

    this.fetchAllProducts(query);

    // setTimeout(() => { router.reload(); }, 1000);
  };

  fetchAllProducts = async (query) => {
    let paginator: ProductPaginator;

    try {
      paginator = await (new ProductService()).getAllProduct(query);
    } catch (error) {
      paginator = {
        products: [],
        total: 0,
      };
      this.openAlert(errorRetrievingDataId);
    }

    this.setState({
      products: paginator.products,
      total: paginator.total,
    });
  };

  changeAlert = (id: string, error: boolean) => {
    this.setState((state: State) => {
      const newState = state;

      newState.alert[id] = error;

      return newState;
    });
  };

  handleCloseAlert = (id: string) => {
    this.changeAlert(id, false);
  };

  openAlert = (id: string) => {
    this.changeAlert(id, true);
  };

  renderPLPListIfThereAreProducts = () => {
    const { seller } = this.props;
    const { products } = this.state;

    return (
      products.length !== 0
        ? (
          <PLPList
            products={products}
            seller={seller}
          />
        )
        : <NoResultProduct />
    );
  };

  render(): React.ReactElement {
    const {
      seller,
    } = this.props;
    const {
      filters, total, alert,
    } = this.state;

    return (
      <>
        <PLPFilter
          filter={filters}
          handleChangeFilter={this.handleChangeFilters}
          seller={seller}
        />
        {this.renderPLPListIfThereAreProducts()}
        <EMLPagination
          totalElements={total}
          limit={PLP.limit}
          page={filters.offset + 1}
          handleChangePagination={this.handleChangePagination}
        />
        <SnackbarErrorRetrievingData
          open={alert[errorRetrievingDataId]}
          handleClose={this.handleCloseAlert}
        />
      </>
    );
  }
}

export default withRouter(PLP);
