import React, { useEffect } from 'react';
import {
  AmplifyAuthenticator,
  AmplifySignUp,
  AmplifySignIn,
  AmplifyForgotPassword,
} from '@aws-amplify/ui-react';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import Auth, { CognitoUser } from '@aws-amplify/auth';

import { CognitoCustomAttributes, getSignedState, useAuthContext } from 'lib/authContext';
import { useRouter } from 'next/router';
import { getHomeLink } from 'lib/links';
import Head from 'next/head';
import { withSSRContext } from 'aws-amplify';
import CartService from 'services/cart-service';


const handleLogin = async () => {
  try {
    const user = await Auth.currentAuthenticatedUser();
    const token = user.signInUserSession.idToken.jwtToken;
    let storage = localStorage.getItem('item');
      if (localStorage != null) {
        if (storage[storage.length - 1] === ',') {
          storage = storage.slice(0, -1);
        }
        storage = `[${storage}]`;
        const products = JSON.parse(storage);

        for (let i = 0; i < products.length; i++) {
          await new CartService().postCartProducts(token, products[i]);
        }
        localStorage.removeItem('item');
      }
  } catch (error) {
    console.log(error);
  }
};

function Login() {
  const { setAuthState, setUserInfo, setSignedState } = useAuthContext();
  const router = useRouter();

  useEffect(() => onAuthUIStateChange(async (nextAuthState: AuthState, authData: any) => {
    if (nextAuthState === AuthState.SignedIn) {
      const { attributes, signInUserSession } = authData;

      setAuthState(nextAuthState);
      setUserInfo({
        name: attributes[CognitoCustomAttributes.name],
        surname: attributes[CognitoCustomAttributes.surname],
        email: attributes.email,
      });
      setSignedState(getSignedState(signInUserSession));

      router.push(getHomeLink());
    }
  }), []);


  return (
    <>
      <Head>
        <title>Authentication | EmporioLambda</title>
      </Head>
      <AmplifyAuthenticator usernameAlias="email">
        <AmplifySignUp
          slot="sign-up"
          usernameAlias="email"
          formFields={[
            { type: 'custom:firstName', placeholder: 'Enter your first name', label: 'First Name *' },
            { type: 'custom:lastName', placeholder: 'Enter your last name', label: 'Last Name *' },
            { type: 'email' },
            { type: 'password' },
          ]}
        />
        <AmplifySignIn handleAuthStateChange={handleLogin} slot="sign-in" usernameAlias="email" />
        <AmplifyForgotPassword />
      </AmplifyAuthenticator>
    </>
  );
}

export default Login;
