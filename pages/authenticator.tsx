import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { AmplifyAuthenticator, AmplifySignUp, AmplifySignIn, AmplifyForgotPassword, AmplifyTotpSetup, AmplifyAuthFields, AmplifyAuth0Button, AmplifyInput } from '@aws-amplify/ui-react'
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components'
import { CognitoUser } from "@aws-amplify/auth"

import { useAuthContext } from "context/authContext";

function Authenticator() {
    const { setAuthState, setUsername } = useAuthContext();
    const router = useRouter()
    
    useEffect(() => {
        return onAuthUIStateChange((nextAuthState: AuthState, authData: CognitoUser) => {            
            if (nextAuthState === AuthState.SignedIn) {
                setAuthState(nextAuthState);
                setUsername(authData.getUsername());
                
                router.replace('/');
            }
        });
    }, []);
    
    return(
        <AmplifyAuthenticator usernameAlias={"email"}>
            <AmplifySignUp
                slot="sign-up"
                usernameAlias="email"
                formFields={[
                    { type: "name", placeholder: "Enter your first name", label: "First Name *" },
                    { type: "lastName", placeholder: "Enter your last name", label: "Last Name *" },
                    { type: "email" },
                    { type: "password" }
                ]}
            />
            <AmplifySignIn slot="sign-in" usernameAlias="email"/>
            <AmplifyForgotPassword />
        </AmplifyAuthenticator>
    );
}

export default Authenticator;