import { Auth } from 'aws-amplify';
import { Button } from '@material-ui/core';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';

const stripePromise = loadStripe('pk_test_51IHqhuEKthtArr3S4MYSAYFEPiFlioccyA4SjUNArmmdSmK7B05UnMdsNKIu0TCRXADZLVmjEUlqKRIR4D2SWtJ700PVmechEl');

export default function CheckoutButton({ cartID }: { cartID: string }) {
  const handleClick = async () => {
    // Get Stripe.js instance
    const stripe = await stripePromise;
    console.log(cartID);
    console.log(stripe);
    // Call your backend to create the Checkout Session
    // const response =
    // await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/create-checkout-session/${cartID}`, { method: 'POST' });

    let token: string;

    try {
      const user = await Auth.currentAuthenticatedUser();
      token = user.signInUserSession.idToken.jwtToken;
    } catch (error) {
      token = '';
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_ORDERS_SERVICE_URL}/stripe-hook`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(response);

    const session = await response.json();

    // Show error if there is one
    if (session.message) {
      alert(session.message);
    } else {
      // When the customer clicks on the button, redirect them to Checkout.
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        // If `redirectToCheckout` fails due to a browser or network
        // error, display the localized error message to your customer
        // using `result.error.message`.
        alert(result.error.message);
      }
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
