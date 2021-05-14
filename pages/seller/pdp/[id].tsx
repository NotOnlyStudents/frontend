import PDPView from 'components/pdp/PDPView';
import { Product } from 'interfaces/products/product';
import Head from 'next/head';
import React from 'react';
import ProductService from 'services/product-service';
import HomeIcon from '@material-ui/icons/Home';
import EMLBreadcrumb from 'components/breadcrumb/EMLBreadcrumb';
import { BreadcrumbPath } from 'interfaces/breadcrumb';
import {
  getHomeLink, getLoginLink, getPLPLink, getViewProductLink,
} from 'lib/links';
import { withSSRContext } from 'aws-amplify';
import { getSignedState } from 'lib/authContext';
import { SignedState } from 'interfaces/login';
import { Snackbars, useSnackbarContext } from 'lib/SnackbarContext';

interface Props {
  product: Product,
  error: boolean
}

function PDPPage({ product, error }: Props) {
  const { openSnackbar } = useSnackbarContext();
  const breadcrumbPaths: BreadcrumbPath[] = [
    { name: 'Home', href: getHomeLink(true), icon: HomeIcon },
    { name: 'Product List Page', href: getPLPLink(true) },
    { name: product.name },
  ];

  React.useEffect(() => {
    
    if(error)
    {
      openSnackbar(Snackbars.errorRetrievingDataId);
    }
  }, []);

  return (
    <>
      <Head>
        <title>
          { `${product.name} | EmporioLambda` }
        </title>
      </Head>
      <EMLBreadcrumb paths={breadcrumbPaths} />
      <PDPView product={product} edit />
    </>
  );
}

export async function getServerSideProps(context) {
  const { Auth } = withSSRContext(context);
  const { query } = context;

  try {
    const { signInUserSession } = await Auth.currentAuthenticatedUser();

    if (await getSignedState(signInUserSession) === SignedState.Customer) {
      return {
        redirect: {
          destination: getViewProductLink(query.id),
          permanent: false,
        },
      };
    }
  } catch (error) {
    return {
      redirect: {
        destination: getLoginLink(),
        permanent: false,
      },
    };
  }

  let product: Product;
  let error = false;

  try {
    product = await (new ProductService()).getProductById(query.id);
  } catch (error) {
    error = true;
    product = {
      name: "Product name",
      description: "",
      images: [ "https://socialistmodernism.com/wp-content/uploads/2017/07/placeholder-image.png" ],
      quantity: 1,
      price: 1,
      evidence: false,
      discount: 0,
      discountedPrice: 1,
      categories: [],
    }
  }

  return {
    props: {
      product,
      error
    },
  };
}

export default PDPPage;
