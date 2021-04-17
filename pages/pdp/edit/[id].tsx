import PDPEdit from 'components/pdp/PDPEdit';
import { BreadcrumbPath } from 'interfaces/breadcrumb';
import { Product } from 'interfaces/products/product';
import React from 'react';
import ProductService from 'services/product-service';
import HomeIcon from '@material-ui/icons/Home';
import EMLBreadcrumb from 'components/breadcrumb/EMLBreadcrumb';

interface Props {
  product: Product
}

function PDPEditPage({ product }: Props) {
  const breadcrumbPaths: BreadcrumbPath[] = [
    { name: 'Home', href: '/', icon: HomeIcon },
    { name: 'Product List Page', href: '/plp' },
    { name: product.name, href: `/pdp/${product.id}` },
    { name: 'Edit' },
  ];

  return (
    <>
      <EMLBreadcrumb paths={breadcrumbPaths} />
      <PDPEdit product={product} />
    </>
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
