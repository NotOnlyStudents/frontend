import PDPView from 'components/pdp/PDPView';
import { PLPProductItem, Product, ProductPaginator } from 'interfaces/products/product';
import Head from 'next/head';
import React from 'react';
import ProductService from 'services/product-service';
import HomeIcon from '@material-ui/icons/Home';
import EMLBreadcrumb from 'components/breadcrumb/EMLBreadcrumb';
import { BreadcrumbPath } from 'interfaces/breadcrumb';

interface Props {
  product: Product
}

function PDPPage({ product }: Props) {
  const breadcrumbPaths: BreadcrumbPath[] = [
    { name: 'Home', href: '/', icon: HomeIcon },
    { name: 'Product List Page', href: '/plp' },
    { name: product.name },
  ];

  return (
    <>
      <Head>
        <title>
          { `${product.name} | EmporioLambda` }
        </title>
      </Head>
      <EMLBreadcrumb paths={breadcrumbPaths} />
      <PDPView product={product} />
    </>
  );
}

export async function getStaticPaths() {
  let products: ProductPaginator;
  try {
    products = await (new ProductService()).getAllProduct();
  } catch (error) {
    console.log(error);
  }
  const productsWithoutTotal: PLPProductItem[] = products.products;

  const paths = productsWithoutTotal.map((singleProduct) => ({
    params: { id: singleProduct.id },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  let product;

  try {
    product = await (new ProductService()).getProductById(params.id);
  } catch (error) {
    console.log(error);
  }

  return {
    props: {
      product,
    },
  };
}

export default PDPPage;
