import React, { ChangeEvent } from 'react';

import { PLPProductItem, ProductFilter } from 'interfaces/products/product';
import { getAllProduct } from 'services/productService';
// import PLPFilter from 'components/plp/PLPFilter';
import EMLPagination from 'components/pagination/EMLPagination';
import PLPList from 'components/plp/PLPList';

interface Props {
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

  constructor(props: Props) {
    super(props);

    this.state = {
      filters: { offset: 0 },
      products: [],
      totalProducts: 0,
    };
  }

  componentDidMount() {
    this.setState({ ...this.props });
  }

  handleChangeFilters = (filters: ProductFilter) => {
    this.setState({ filters });
  };

  handleChangePagination = (event: ChangeEvent<unknown>, value: number) => {
    this.setState({ filters: { offset: value } });
  };

  render(): React.ReactElement {
    const { filters, products, totalProducts } = this.state;

    return (
      <>
        {/* <PLPFilter
                    filter={filters}
                    handleChangeFilter={this.handleChangeFilters}
                /> */}
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

  const products = await getAllProduct(filters);

  return {
    props: {
      filters,
      products,
      totalProducts: 250,
    },
  };
}

export default PLPCustomer;
