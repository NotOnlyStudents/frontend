import Layout from 'components/Layout';
import CartList from 'components/cart/cartList';
import getCartItems from 'services/cartService';
import {Cart} from 'interfaces/cart';
import { BreadcrumbPath } from 'interfaces/breadcrumb';
import EMLBreadcrumb from 'components/breadcrumb/EMLBreadcrumb';
import HomeIcon from '@material-ui/icons/Home';
import React from 'react';
import Head from 'next/head';

interface Props {
  cart: Cart;
}


function cartPage({ cart }: Props){

//console.log(cart["products"][0]);
 const breadcrumbPaths:BreadcrumbPath[] = [
  { name: 'Home', href: '/', icon: HomeIcon },
  { name: 'Cart Page' },
];

 return (<>
      <Head>
        <title> Products List Page | EmporioLambda</title>
      </Head>
      <EMLBreadcrumb paths={breadcrumbPaths} />
      <h1>Your Cart</h1>
      <CartList items={cart["products"]}/>
    </>
  )
}



export async function getServerSideProps() {
  let cart;

  try {
    cart = await getCartItems();;
  } catch (error) {
    console.log(error);
  }

  return {
    props: {
      cart,
    },
  };
}
  export default cartPage
  