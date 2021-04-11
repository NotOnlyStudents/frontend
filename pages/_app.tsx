import { AppProps } from 'next/app';
import { AuthContextProvider } from 'context/authContext';
import { Amplify, Auth } from 'aws-amplify';
import React from 'react';
import Head from 'next/head';
import Layout from 'components/Layout';
import theme from 'styles/theme';

import 'styles/global.scss';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

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
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <AuthContextProvider>
      <Head>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </AuthContextProvider>
  );
}

export default App;
