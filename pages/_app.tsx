import { AppProps } from 'next/app'
import { AuthContextProvider } from 'context/authContext'
import { Amplify, Auth } from 'aws-amplify'
import React from 'react';
import Head from 'next/head';
import Header from 'components/header/Header';
import Layout from 'components/Layout';

import 'styles/global.scss'

// Amplify.configure({
//   Auth: {
//     region: process.env.USER_POOL_REGION,
//     userPoolId: process.env.USER_POOL_ID,
//     userPoolWebClientId: process.env.USER_POOL_CLIENT_ID,
//   },
//     cookieStorage: {
//       domain: process.env.AUTH_COOKIE_DOMAIN,
//       path: "/",
//       expires: 7,
//       secure: false,
//     },
//   ssr: true
// });

function App({ Component, pageProps }: AppProps) {
  return(
    <AuthContextProvider>
       <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthContextProvider>    
  );
}

export default App;
