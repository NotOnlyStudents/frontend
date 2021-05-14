import PDPView from 'components/pdp/PDPView';
import {
  PLPProductItem, Product, ProductPaginator,
} from 'interfaces/products/product';
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
import { Snackbars, useSnackbarContext } from 'lib/SnackbarContext';

interface Props {
  product: Product,
  error: boolean
}

function PDPPage({ product, error }: Props) {
  const { openSnackbar } = useSnackbarContext();
  const breadcrumbPaths: BreadcrumbPath[] = [
    { name: 'Home', href: getHomeLink(), icon: HomeIcon },
    { name: 'Product List Page', href: getPLPLink() },
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

export async function getStaticProps(context) {
  const { Auth } = withSSRContext(context);
  const { params } = context;

  try {
    const { signInUserSession } = await Auth.currentAuthenticatedUser();
    const signedState = await getSignedState(signInUserSession);

    if (signedState === SignedState.Seller) {
      return {
        redirect: {
          destination: getViewProductLink(params.id, true),
          permanent: false,
        },
      };
    }
  } catch (e) { }

  let product: Product;
  let error = false;

  try {
    product = await (new ProductService()).getProductById(params.id);
  } catch (e) {
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
      revalidate: 30,
      error
    },
  };
}

export default PDPPage;
