import React, { useEffect } from 'react';
import { CognitoUser } from '@aws-amplify/auth';
import { withSSRContext } from 'aws-amplify';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import { useAuthContext } from 'context/authContext';

import Header from 'components/header/Header';

interface Props {
  children: React.ReactNode,
  _authState?: AuthState,
  _username?: string | undefined
}

function Layout({ children, _authState, _username }: Props) {
  const {
    authState, username, setAuthState, setUsername,
  } = useAuthContext();

  useEffect(
    () => {
      setAuthState(_authState);
      setUsername(_username);

      return onAuthUIStateChange((nextAuthState: AuthState) => {
        if (nextAuthState === AuthState.SignedOut) {
          setAuthState(nextAuthState);
          setUsername(undefined);
        }
      });
    },
    [],
  );

  return (
    <>
      <Header
        authState={authState}
        username={username}
      />
      <main>
        {children}
      </main>
    </>
  );
}

export async function getServerSideProps(context) {
  const { Auth } = withSSRContext(context);

  try {
    const user: CognitoUser = await Auth.currentAuthenticatedUser();

    return {
      props: {
        _authState: AuthState.SignedIn,
        _username: user.getUsername(),
      },
    };
  } catch (err) {
    return {
      props: {
        _authState: AuthState.SignedOut,
      },
    };
  }
}

export default Layout;
