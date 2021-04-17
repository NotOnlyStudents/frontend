
import React from 'react';
import { CardMedia, fade, Typography } from '@material-ui/core';

import { makeStyles } from '@material-ui/styles';
import { PLPProductItem, ProductFilter } from 'interfaces/products/product';
import ProductService from 'services/product-service';
import Head from 'next/head';
import PLPList from 'components/plp/PLPList';

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
  },
  evidanceTitle: {
    padding: '1.5rem 0 1rem 0',
  },
});

function Home({ products }: Props) : React.ReactElement {
  const classes = useStyles();

  return (
    <>
      <Head>
        <title>Home | EmporioLambda</title>
      </Head>
      <div className={classes.root}>
        <CardMedia component="img" image="/images/home.jpg" />
        <Typography className={classes.description} component="span" align="center">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit ipsa
          impedit explicabo officiis necessitatibus at cum, rerum ea perferendis
          consequuntur provident praesentium eligendi tenetur nisi ipsum et officia ullam. A.
        </Typography>
      </div>
      <Typography
        className={classes.evidanceTitle}
        variant="h4"
        component="h2"
      >
        Featured products
      </Typography>
      <PLPList products={products} />
    </>
  );
}

export async function getServerSideProps() {
  const filters: ProductFilter = { evidance: true };

  let products = [];

  try {
    products = await (new ProductService()).getAllProduct(filters);
  } catch (error) {
    console.log(error);
  }

  return {
    props: {
      products,
    },
  };
}

export default Home;
