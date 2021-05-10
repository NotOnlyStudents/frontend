import PDPView from 'components/pdp/PDPView';
import { Product } from 'interfaces/products/product';
import Head from 'next/head';
import React from 'react';
import ProductService from 'services/product-service';
import HomeIcon from '@material-ui/icons/Home';
import EMLBreadcrumb from 'components/breadcrumb/EMLBreadcrumb';
import { BreadcrumbPath } from 'interfaces/breadcrumb';
import { getHomeLink, getPLPLink, getViewProductLink } from 'lib/links';
import { withSSRContext } from 'aws-amplify';
import { getSignedState } from 'lib/authContext';
import { SignedState } from 'interfaces/login';

interface Props {
  product: Product
}

function PDPPage({ product }: Props) {
  const breadcrumbPaths: BreadcrumbPath[] = [
    { name: 'Home', href: getHomeLink(), icon: HomeIcon },
    { name: 'Product List Page', href: getPLPLink() },
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

export async function getServerSideProps(context) {
  const { Auth } = withSSRContext(context);
  const { query } = context;

  try {
    const { signInUserSession } = await Auth.currentAuthenticatedUser();
    const signedState = await getSignedState(signInUserSession);

    if (signedState === SignedState.Seller) {
      return {
        redirect: {
          destination: getViewProductLink(query.id, true),
          permanent: false,
        },
      };
    }
  } catch (e) { }

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

export default PDPPage;
