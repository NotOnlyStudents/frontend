import React, { useEffect } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components'
import { useAuthContext } from 'context/authContext'
import { AmplifySignOut } from '@aws-amplify/ui-react'


const name = 'EmporioLambda'

interface LayoutProps
{
  children: React.ReactNode,
  title: string,
  _authState:AuthState;
  _username:string | undefined;
}

export default function Layout({
  children,
  title,
  _authState,
  _username
}: LayoutProps) 
{

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
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Emporio Lambda"
        />
        <title></title>
        <meta
          property="og:image"
          content={`https://og-image.now.sh/${encodeURI(
            title
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={title} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header>
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
      </header>
      {children}
    </>
  )

}
