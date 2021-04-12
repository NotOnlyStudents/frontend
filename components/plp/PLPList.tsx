import React from 'react';
import { PLPProductItem } from 'interfaces/products/product';
import PLPProduct from 'components/plp/PLPProduct';
import { Grid } from '@material-ui/core';

interface Props {
  products: PLPProductItem[];
}

function PLPList({ products }: Props) : React.ReactElement {
  const renderAllItems = (): React.ReactElement[] => products.map(
    (product: PLPProductItem): React.ReactElement => (
      <Grid key={product.id} item xs={12} sm={6} md={4} lg={3}>
        <PLPProduct product={product} />
      </Grid>
    ),
  );

  return (
    <Grid container spacing={3} justify="center" alignItems="center">
      {renderAllItems()}
    </Grid>
  );
}

export default PLPList;
