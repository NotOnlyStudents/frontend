import PDPEdit from 'components/pdp/PDPEdit';
import { BreadcrumbPath } from 'interfaces/breadcrumb';
import { Product } from 'interfaces/products/product';
import React from 'react';
import ProductService from 'services/product-service';
import HomeIcon from '@material-ui/icons/Home';
import EMLBreadcrumb from 'components/breadcrumb/EMLBreadcrumb';
import { getHomeLink, getPLPLink, getViewProductLink } from 'lib/links';

interface Props {
  product: Product
}

function PDPEditPage({ product }: Props) {
  const breadcrumbPaths: BreadcrumbPath[] = [
    { name: 'Home', href: getHomeLink(true), icon: HomeIcon },
    { name: 'Product List Page', href: getPLPLink(true) },
    { name: product.name, href: getViewProductLink(product.id, true) },
    { name: 'Edit' },
  ];

  const title = `Editing ${product.name}`;

  const p: Product = {
    id: product.id,
    name: product.name,
    description: product.description,
    images: product.images,
    quantity: product.quantity,
    price: product.price,
    evidence: product.evidence || false,
    categories: product.categories,
    discount: product.discount !== null ? product.discount : 0,
  };

  return (
    <>
      <EMLBreadcrumb paths={breadcrumbPaths} />
      <PDPEdit
        title={title}
        product={p}
      />
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
