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
  breadcrumbPaths: BreadcrumbPath[] = [
    { name: 'Home', href: '/', icon: HomeIcon },
    { name: 'Product List Page' },
  ];
//console.log(cart["products"][0]);

 return (<>
      <Head>
        <title> Products List Page | EmporioLambda</title>
      </Head>
      <EMLBreadcrumb paths={this.breadcrumbPaths} />
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
  