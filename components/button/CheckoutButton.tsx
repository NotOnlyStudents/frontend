import { Auth } from 'aws-amplify';
import { Button } from '@material-ui/core';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import CartService from 'services/cart-service';
import CartServiceType from 'services/cart-service/CartService';
import { CartToken } from 'interfaces/cart/cart-request';

const stripePromise = loadStripe('pk_test_51IHqhuEKthtArr3S4MYSAYFEPiFlioccyA4SjUNArmmdSmK7B05UnMdsNKIu0TCRXADZLVmjEUlqKRIR4D2SWtJ700PVmechEl');

export default function CheckoutButton({ cartID }: { cartID: string }) {
  const handleClick = async () => {
  // Get Stripe.js instance
    const stripe = await stripePromise;
    console.log(cartID);
    console.log(stripe);
    // Call your backend to create the Checkout Session
    // const response =

    let token: string;

    try {
      const user = await Auth.currentAuthenticatedUser();
      token = user.signInUserSession.idToken.jwtToken;
    } catch (error) {
      token = '';
    }

    const cartToken: CartToken = await (new CartService()).getCartToken(token);

    const obj = {
      address: {
        id: '1e1a9e37-73c5-4d88-a220-9940efa846bb',
        nation: 'Italia',
        city: 'Marcon',
        address: 'Via Astori 7',
        cap: 30020,
      },
      'cart-token': {
        ...cartToken,
      },
      additionalInfo: 'Grazie Signore adesso pensiamo ad una soluzione',
    };

    console.log(JSON.stringify(obj));

    const response = await fetch(`${process.env.NEXT_PUBLIC_ORDERS_SERVICE_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(obj),
    });

    const cartService: CartServiceType = new CartService();

    cartToken.token.data.products.map(async (product) => {
      await cartService.deleteCartProducts(token, product.id);
    });

    const res = await response.json();

    console.log(res);

    const result = await stripe.redirectToCheckout({
      sessionId: res.data.sessionId,
    });

    if (result.error) {
    // If `redirectToCheckout` fails due to a browser or network
    // error, display the localized error message to your customer
    // using `result.error.message`.
      console.log(result.error.message);
    }
  };

  return (
    <Button
      color="primary"
      variant="contained"
      onClick={handleClick}
    >
      Checkout
    </Button>
  );
}
