import React from 'react';
import {
  CardMedia, fade, Link, Typography,
} from '@material-ui/core';

import { makeStyles } from '@material-ui/styles';
import { PLPProductItem, ProductFilter, ProductPaginator } from 'interfaces/products/product';
import ProductService from 'services/product-service';
import Head from 'next/head';
import PLPList from 'components/plp/PLPList';
import { getHomeLink, getPLPLink } from 'lib/links';
import { getSignedState } from 'lib/authContext';
import { SignedState } from 'interfaces/login';
import { withSSRContext } from 'aws-amplify';
import { useRouter } from 'next/router';
import { Snackbars, useSnackbarContext } from 'lib/SnackbarContext';

interface Props {
  products: PLPProductItem[];
  error: boolean;
}

const useStyles = makeStyles({
  root: {
    position: 'relative',
    display: 'flex',
    height: '30em',
    '& > *': {
      position: 'absolute',
      height: '100%',
    },
  },
  description: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: fade('#000', 0.5),
    color: 'white',
    width: '100%',
    fontSize: '1.2em',
    padding: '1em',
  },
  evidenceTitle: {
    padding: '1.5rem 0 1rem 0',
  },
});

function HomeCustomer({ products, error }: Props) : React.ReactElement {
  const classes = useStyles();
  const { openSnackbar } = useSnackbarContext();
  const router = useRouter();

  React.useEffect(() => {
    if(error)
    {
      openSnackbar(Snackbars.errorRetrievingDataId);
    }
  }, []);

  const renderFeaturedProductsIfPresent = () => (products.length
    ? (
      <>
        <Typography
          className={classes.evidenceTitle}
          variant="h4"
          component="h2"
        >
          Featured products
        </Typography>
        <PLPList products={products} />
      </>
    )
    : <></>);

  return (
    <>
      <Head>
        <title>Home | EmporioLambda</title>
      </Head>
      <div className={classes.root}>
        <CardMedia component="img" image="/images/home.jpg" />
        <Typography
          className={classes.description}
          component="span"
          align="center"
        >
          Science fiction, novels, fairy tales, fantasy and many other literary genres.
          <br />
          Here at EmporioLambda you can find many books for all tastes and people.
          <br />
          Start searching in our large library, or
          <Link
            onClick={() => { router.push(getPLPLink()); }}
            color="inherit"
            underline="always"
          >
            browse it aimlessly.
          </Link>
        </Typography>
      </div>
      { renderFeaturedProductsIfPresent() }
    </>
  );
}

export async function getServerSideProps(context) {
  const { Auth } = withSSRContext(context);
  try {
    const { signInUserSession } = await Auth.currentAuthenticatedUser();

    if (await getSignedState(signInUserSession) === SignedState.Seller) {
      return {
        redirect: {
          destination: getHomeLink(true),
          permanent: false,
        },
      };
    }
  } catch (error) { }

  const filters: ProductFilter = { evidence: true };

  let paginator: ProductPaginator;
  let error = false;

  try {
    paginator = await (new ProductService()).getAllProduct(filters);
  } catch (error) {
    error = true;
    paginator = {
      products: [],
      total: 0
    };
  }

  return {
    props: {
      products: paginator.products,
      error
    },
  };
}

export default HomeCustomer;
