import CartList from 'components/cart/cartList';
import CartService from 'services/cart-service/CartServiceLocal';
import { BreadcrumbPath } from 'interfaces/breadcrumb';
import EMLBreadcrumb from 'components/breadcrumb/EMLBreadcrumb';
import HomeIcon from '@material-ui/icons/Home';
import React from 'react';
import Head from 'next/head';
import { Typography } from '@material-ui/core';
import NoProductInCart from 'components/noresult/NoProductsInCart';
import { Cart } from 'interfaces/cart/cart';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { getHomeLink } from 'lib/links';
import { Auth, withSSRContext } from 'aws-amplify';
import { getSignedState, useAuthContext } from 'lib/authContext';
import { SignedState } from 'interfaces/login';

interface Props {
  cart: Cart;
}

function cartPage({ cart }: Props) {
  const breadcrumbPaths: BreadcrumbPath[] = [
    { name: 'Home', href: getHomeLink(), icon: HomeIcon },
    { name: 'Cart' },
  ];

  const renderCartList = () =>{
    const { signedState } = useAuthContext();
    if (cart.products.length == 0)
    {
      if(signedState===SignedState.Customer)
      {
        return (<NoProductInCart />);
      }
      else
      {
        return (<CartList items={cart.products} authenticated={false}/>);
      }
    }
    else {
      return (<CartList items={cart.products} authenticated={true}/>);
    }
  }

  return (
    <>
      <Head>
        <title> Cart | EmporioLambda</title>
      </Head>
      <EMLBreadcrumb paths={breadcrumbPaths} />
      <Typography variant="h4" component="h2">
        Your cart
      </Typography>
      <CartList products={cart.products} />
    </>
  );
}

export async function getServerSideProps(context) {
  let products = [];
  const { Auth } = withSSRContext(context);
  var token = '';
  try {
    const { signInUserSession } = await Auth.currentAuthenticatedUser();
    const token = signInUserSession.idToken.jwtToken;

    const signedState = await getSignedState(signInUserSession);

    if (signedState === SignedState.Seller) {
      return {
        redirect: {
          destination: getHomeLink(true),
          permanent: false,
        },
      };
    }

    try {
      products = await new CartService().getCartProducts(token);
    } catch (error) {
      products = [];
    }
  } catch { console.log('There was a problem with servers'); }

  return {
    props: {
      cart: {
        products,
      },
    },
  };
}
export default cartPage;
