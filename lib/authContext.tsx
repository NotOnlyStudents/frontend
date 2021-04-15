import React, { createContext, useContext, useState } from 'react';

import { AuthState } from '@aws-amplify/ui-components';

interface AuthContextProps {
  readonly authState: AuthState,
  readonly username: string | undefined,
  // eslint-disable-next-line no-unused-vars
  setAuthState: (newAuthState: AuthState) => void,
  // eslint-disable-next-line no-unused-vars
  setUsername: (newUsername: string | undefined) => void
}

export const AuthContext = createContext<Partial<AuthContextProps>>({});

export function AuthContextProvider({ children }) {
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
