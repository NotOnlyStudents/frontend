import React, { createContext, useContext, useState } from 'react';

import { AuthState } from '@aws-amplify/ui-components';
import Auth from '@aws-amplify/auth';
import { useRouter } from 'next/router';
import { getHomeLink } from './links';

interface AuthContextProps {
  readonly authState: AuthState,
  readonly username: string | undefined,
  // eslint-disable-next-line no-unused-vars
  setAuthState: (newAuthState: AuthState) => void,
  // eslint-disable-next-line no-unused-vars
  setUsername: (newUsername: string | undefined) => void
}

export const AuthContext = createContext<Partial<AuthContextProps>>({});

interface Props {
  children: React.ReactElement;
}

export function AuthContextProvider({ children }: Props) {
  const [authState, setAuthState] = useState<AuthState>();
  const [username, setUsername] = useState<string | undefined>();

  return (
    <AuthContext.Provider value={{
      authState,
      setAuthState,
      username,
      setUsername,
    }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}

export function isSeller(signInUserSession): boolean {
  return signInUserSession.accessToken.payload['cognito:groups'][0] === 'sellers';
}

export async function signOut() {
  try {
    await Auth.signOut();
    const router = useRouter();
    router.push(getHomeLink());
  } catch (error) {
    console.log('error signing out: ', error);
  }
}
