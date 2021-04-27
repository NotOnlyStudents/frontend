import React from 'react';

import { PLPProductItem, ProductFilter, ProductPaginator } from 'interfaces/products/product';
import ProductService from 'services/product-service';
import Head from 'next/head';
import EMLBreadcrumb from 'components/breadcrumb/EMLBreadcrumb';
import HomeIcon from '@material-ui/icons/Home';
import { BreadcrumbPath } from 'interfaces/breadcrumb';
import PLP from 'components/plp/PLP';
import NoResultProduct from 'components/noresult/NoResultProduct';

interface Props {
  filters: ProductFilter,
  products: PLPProductItem[],
  total: number
}

function PLPSellerPage({ filters, products, total }: Props) {
  const breadcrumbPaths: BreadcrumbPath[] = [
    { name: 'Home', href: '/', icon: HomeIcon },
    { name: 'Product List Page' },
  ];

  const renderProductsList = () => (
    products.length !== 0
      ? (
        <PLP
          filters={filters}
          products={products}
          total={total}
          seller
        />
      )
      : <NoResultProduct />
  );

  return (
    <>
      <Head>
        <title>Products List Page | EmporioLambda</title>
      </Head>
      <EMLBreadcrumb paths={breadcrumbPaths} />
      { renderProductsList() }
    </>
  );
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

  if (query.evidence) {
    filters.evidence = query.evidence === 'true';
  }

  if (query.priceMin) {
    filters.priceMin = query.priceMin;
  }

  if (query.priceMax) {
    filters.priceMax = query.priceMax;
  }

  filters.limit = 24;

  let paginator: ProductPaginator;

  try {
    paginator = await (new ProductService()).getAllProduct(filters);
  } catch (error) {
    console.error(error);
  }

  return {
    props: {
      filters,
      products: paginator.products,
      total: paginator.total,
    },
  };
}

export default PLPSellerPage;
