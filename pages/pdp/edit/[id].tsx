import PDPEdit from 'components/pdp/PDPEdit';
import { Product } from 'interfaces/products/product';
import React from 'react';
import ProductService from 'services/product-service';

interface Props {
  product: Product
}

function PDPEditPage({ product }: Props) {
  return (
    <PDPEdit product={product} />
  );
}

export async function getServerSideProps({ query }) {
  let product;

  try {
    product = await (new ProductService()).getProductById(query.id);
  } catch (error) {
    console.log(error);
  }

  return {
    props: {
      product,
    },
  };
}

export default PDPEditPage;
