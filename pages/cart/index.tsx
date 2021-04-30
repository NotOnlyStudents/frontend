import CartList from 'components/cart/cartList';
import CartService from 'services/cart-service/CartServiceFetch';
import { BreadcrumbPath } from 'interfaces/breadcrumb';
import EMLBreadcrumb from 'components/breadcrumb/EMLBreadcrumb';
import HomeIcon from '@material-ui/icons/Home';
import React from 'react';
import Head from 'next/head';
import { Typography } from '@material-ui/core';
import NoProductInCart from 'components/noresult/NoProductsInCart';
import { Cart } from 'interfaces/cart/cart';
import { Auth, withSSRContext } from 'aws-amplify';
import { CognitoUser } from '@aws-amplify/auth';
import { AuthState } from '@aws-amplify/ui-components';

interface Props {
  cart: Cart;
}

function cartPage({ cart }: Props) {
  const breadcrumbPaths:BreadcrumbPath[] = [
    { name: 'Home', href: '/', icon: HomeIcon },
    { name: 'Cart' },
  ];

  const renderCartList = () => (cart.products.length !== 0
    ? <CartList items={cart.products} />
    : <NoProductInCart />);

  return (
    <>
      <Head>
        <title> Cart | EmporioLambda</title>
      </Head>
      <EMLBreadcrumb paths={breadcrumbPaths} />
      <Typography variant="h4" component="h2">
        Your cart
      </Typography>
      { renderCartList() }
    </>
  );
}

export async function getServerSideProps(context) {
  let products = [];
  const { Auth } = withSSRContext(context);

  try {
    const user = await Auth.currentAuthenticatedUser();
    const token = user.signInUserSession.idToken.jwtToken;
    try {
      products = await (new CartService()).getCartProducts(token);
      console.log(products);
    } catch (error) {
      console.log(error);
    }
  } 
  catch{console.log("There was a problem with server");}


  return {
    props: {
      cart: {
        products,
      },
    },
  };
}
export default cartPage;
