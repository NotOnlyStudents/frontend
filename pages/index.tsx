import React from 'react';
import {
  CardMedia, fade, Link, Typography,
} from '@material-ui/core';

import { makeStyles } from '@material-ui/styles';
import { PLPProductItem, ProductFilter } from 'interfaces/products/product';
import ProductService from 'services/product-service';
import Head from 'next/head';
import PLPList from 'components/plp/PLPList';
import { getPLPLink } from 'lib/links';

interface Props {
  products: PLPProductItem[];
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

function HomeCustomer({ products }: Props) : React.ReactElement {
  const classes = useStyles();

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
            href={getPLPLink()}
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

export async function getStaticProps() {
  const filters: ProductFilter = { evidence: true };

  let paginator;

  try {
    paginator = await (new ProductService()).getAllProduct(filters);
  } catch (error) {
    console.log(error);
    paginator = {
      products: [],
    };
  }

  return {
    props: {
      products: paginator.products,
    },
  };
}

export default HomeCustomer;
