import React from 'react';
import { withSSRContext } from 'aws-amplify';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import { isSeller, useAuthContext } from 'lib/authContext';

import Header from 'components/header/Header';
import { SignedState } from 'interfaces/login';

interface Props {
  children: React.ReactNode,
  signedState: SignedState
}

function Layout({ children, signedState }: Props) {
  return (
    <>
      {/* <Header
        signedState={signedState}
      /> */}
      <main>
        {children}
      </main>
    </>
  );
}

export async function getServerSideProps(context) {
  const { Auth } = withSSRContext(context);
  let signedState: SignedState;

  try {
    const { signInUserSession } = await Auth.currentAuthenticatedUser();
    if (isSeller(signInUserSession)) {
      signedState = SignedState.Seller;
    } else {
      signedState = SignedState.Customer;
    }
  } catch {
    signedState = SignedState.NotAuthenticated;
  }

  return {
    props: {
      signedState,
    },
  };
}

export default Layout;
