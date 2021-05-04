import React, { createContext, useContext, useState } from 'react';

import { AuthState } from '@aws-amplify/ui-components';
import { SignedState } from 'interfaces/login';
import { UserInfo } from 'interfaces/users/users';
import { Auth } from 'aws-amplify';

interface AuthContextProps {
  authState: AuthState,
  userInfo: UserInfo,
  signedState: SignedState,

  setAuthState: (newAuthState: AuthState) => void,
  setUserInfo: (userInfo: UserInfo) => void,
  setSignedState: (signedState: SignedState) => void
}

export const AuthContext = createContext<Partial<AuthContextProps>>({});

interface Props {
  children: React.ReactElement;
}

function AuthContextProvider({ children }: Props) {
  const [authState, setAuthState] = useState<AuthState>();
  const [signedState, setSignedState] = useState<SignedState>(SignedState.NotAuthenticated);
  const [userInfo, setUserInfo] = useState<UserInfo>({});

  const checkSignedState = async () => {
    const { signInUserSession, attributes } = await Auth.currentAuthenticatedUser();

    setSignedState(getSignedState(signInUserSession));
    setUserInfo({
      name: attributes[CognitoCustomAttributes.name],
      surname: attributes[CognitoCustomAttributes.surname],
      email: attributes.email,
    });
  };

  React.useEffect(() => {
    checkSignedState();
  }, []);

  return (
    <AuthContext.Provider value={{
      authState,
      setAuthState,
      signedState,
      setSignedState,
      userInfo,
      setUserInfo,
    }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}

export enum CognitoCustomAttributes {
  name = 'custom:firstName',
  surname = 'custom:lastName',
}

export function getSignedState(userSession) : SignedState {
  let signedState;

  function isSeller(signInUserSession): boolean {
    return signInUserSession.accessToken.payload['cognito:groups'][0] === 'sellers';
  }

  try {
    if (isSeller(userSession)) {
      signedState = SignedState.Seller;
    } else {
      signedState = SignedState.Customer;
    }
  } catch {
    signedState = SignedState.NotAuthenticated;
  }

  return signedState;
}

export default AuthContextProvider;
