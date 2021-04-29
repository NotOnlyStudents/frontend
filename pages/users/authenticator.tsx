import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  AmplifyAuthenticator, AmplifySignUp, AmplifySignIn, AmplifyForgotPassword, AmplifyTotpSetup, AmplifyAuthFields, AmplifyAuth0Button, AmplifyInput,
} from '@aws-amplify/ui-react';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import { CognitoUser } from '@aws-amplify/auth';

import { useAuthContext } from 'lib/authContext';

function Authenticator() {
  const { setAuthState, setUsername } = useAuthContext();
  //const router = useRouter();

  useEffect(() => onAuthUIStateChange((nextAuthState: AuthState, authData: CognitoUser) => {
    if (nextAuthState === AuthState.SignedIn) {
      setAuthState(nextAuthState);
      setUsername(authData.getUsername());
      document.location.href = '/';
    }
  }), []);

  /*
  const signUpFields = [
    {

      type: "email",
      label: "custom_label",
      placeholder: "Custom placeholder",
      hint: null,
      required: true,
    },
  ];*/

  return (
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
      <AmplifySignIn slot="sign-in" usernameAlias="email" />
      <AmplifyForgotPassword />
    </AmplifyAuthenticator>
  );
}

export default Authenticator;