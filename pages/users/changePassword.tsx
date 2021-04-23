import React from 'react';
import { CognitoUser } from '@aws-amplify/auth';
import { withSSRContext } from 'aws-amplify';
import { AuthState } from '@aws-amplify/ui-components';
import 'components/users/personalAreaForm';
import FormPassword from 'components/users/changePasswordForm';

function changePassowrd() {
  return (
    <>
      <div id="root">
        <FormPassword />
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const { Auth } = withSSRContext(context);
  const user: CognitoUser = await Auth.currentAuthenticatedUser();
  try {
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

export default changePassowrd;