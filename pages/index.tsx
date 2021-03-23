import Head from 'next/head'
import Link from 'next/link'
import { useEffect } from 'react';
import { GetServerSideProps } from "next"
import { CognitoUser } from "@aws-amplify/auth"
import { withSSRContext } from 'aws-amplify'
import { AmplifySignOut } from '@aws-amplify/ui-react'
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components'
import { useAuthContext } from "context/authContext"


export default function Home({
  _authState,
  _username
}: {
  _authState: AuthState,
  _username: string | undefined
}) {
  const { authState, username, setAuthState, setUsername} = useAuthContext();

  useEffect(() => {
    setAuthState(_authState);
    setUsername(_username);

    return onAuthUIStateChange((nextAuthState: AuthState) => {      
      if (nextAuthState === AuthState.SignedOut) {
        setAuthState(nextAuthState);
        setUsername(undefined);
      }
    });
  }, []);



  return (
      <div>
        <div className="container md:mx-auto mt-10">
          <div className="md:flex rounded-b-xl md:rounded-xl shadow-lg border my-10">
            <div className="md:w-3/4 md:rounded-xl px-3 md:px-10 py-5 md:py-10">
            </div>

              <div className="border-t md:mt-8">
                <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                  <span>Total cost</span>
                </div>
                {authState === AuthState.SignedIn && username ? (
                  <>
                    <AmplifySignOut />
                  </>
                ) : (
                  <Link href="/authenticator">
                    <button className="bg-indigo-500 font-semibold hover:bg-opacity-80 active:bg-indigo-600 py-3 text-sm text-white uppercase w-full">
                      Login!
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { Auth } = withSSRContext(context);

  try {
    const user: CognitoUser = await Auth.currentAuthenticatedUser();

    return {
      props: {
        _authState: AuthState.SignedIn,
        _username: user.getUsername()
      }
    }
  } catch (err) {
    return {
      props: {
        _authState: AuthState.SignedOut
      }
    }
  }
}
