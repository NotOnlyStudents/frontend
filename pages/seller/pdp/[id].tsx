import PDPView from 'components/pdp/PDPView';
import { PLPProductItem, Product, ProductPaginator } from 'interfaces/products/product';
import Head from 'next/head';
import React from 'react';
import ProductService from 'services/product-service';
import HomeIcon from '@material-ui/icons/Home';
import EMLBreadcrumb from 'components/breadcrumb/EMLBreadcrumb';
import { BreadcrumbPath } from 'interfaces/breadcrumb';
import {
  getHomeLink, getLoginLink, getPLPLink, getViewProductLink,
} from 'lib/links';
import { Auth } from 'aws-amplify';
import { getSignedState, useAuthContext } from 'lib/authContext';
import { SignedState } from 'interfaces/login';
import { useRouter } from 'next/router';

interface Props {
  product: Product,
}

function PDPPage({ product }: Props) {
  const router = useRouter();
  const breadcrumbPaths: BreadcrumbPath[] = [
    { name: 'Home', href: getHomeLink(true), icon: HomeIcon },
    { name: 'Product List Page', href: getPLPLink(true) },
    { name: product.name },
  ];

  const checkAuth = async () => {
    const { signInUserSession } = await Auth.currentAuthenticatedUser();
    const signedState = await getSignedState(signInUserSession);

    switch(signedState)
    {
      case SignedState.Customer: {
        router.push(getViewProductLink(product.id));
        break;
      }
      case SignedState.Customer: {
        router.push(getLoginLink());
        break;
      }
      default:
        break;
    }
  }

  React.useEffect(() => { checkAuth(); }, []);

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

export async function getStaticPaths() {
  let paginator: ProductPaginator;
  try {
    paginator = await (new ProductService()).getAllProduct();
  } catch (error) {
    console.error(error);
    paginator = {
      products: [],
      total: 0,
    };
  }
  const productsWithoutTotal: PLPProductItem[] = paginator.products;

  const paths = productsWithoutTotal.map((singleProduct) => ({
    params: { id: singleProduct.id },
  }));

  return { paths, fallback: 'blocking' };
}

export async function getStaticProps(context) {
  let product: Product;
  const { params } = context;

  try {
    product = await (new ProductService()).getProductById(params.id);
  } catch (error) {
    return {
      notFound: true
    };
  }

  return {
    props: {
      product,
    },
    revalidate: 1
  };
}

export default PDPPage;
