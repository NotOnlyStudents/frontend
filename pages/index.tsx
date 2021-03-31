import React from 'react';
import { CognitoUser } from '@aws-amplify/auth';
import { withSSRContext } from 'aws-amplify';
import { AuthState } from '@aws-amplify/ui-components';
import Layout from 'components/Layout';

/* eslint no-underscore-dangle: 0 */

function Home({ _authState,_username }) {
  return (
    <Layout _authState={_authState} _username={_username}>
      <div>
        prova prova
      </div>
    </Layout>
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

export default Home;
