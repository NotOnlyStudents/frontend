import React, { useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import { useAuthContext } from 'context/authContext';

// const name = 'EmporioLambda';
export const siteTitle = 'EmporioLambda';

export default function Layout({
  children,
  _authState,
  _username,
}: {
  children: React.ReactNode,
  _authState:AuthState,
  _username:string | undefined
}) {
  const {
    authState, username, setAuthState, setUsername,
  } = useAuthContext();

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
        <meta
          property="og:image"
          content={`https://og-image.now.sh/${encodeURI(
            siteTitle,
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header>
        {authState === AuthState.SignedIn && username ? (
          <>
            <Link href="/personalArea">
              <button type="button" name="personalArea">Your personal Area!</button>
            </Link>
          </>
        ) : (
          <Link href="/authenticator">
            <button type="button" name="loginButton">Login!</button>
          </Link>
        )}
      </header>
      {children}
    </>
  );
}
