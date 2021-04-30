import React from 'react';
import { withSSRContext } from 'aws-amplify';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import { isSeller, useAuthContext } from 'lib/authContext';

import Header from 'components/header/Header';
import { SignedState } from 'interfaces/login';

interface Props {
  children: React.ReactNode,
}

function Layout({ children }: Props) {
  return (
    <>
      <Header />
      <main>
        {children}
      </main>
    </>
  );
}

export default Layout;
