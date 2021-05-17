import { withSSRContext } from 'aws-amplify';
import { SignedState } from 'interfaces/login';
import { getSignedState } from 'lib/authContext';
import { getHomeLink, getLoginLink, getOrderLink } from 'lib/links';
import Head from 'next/head';
import React from 'react';

function HomeSeller() : React.ReactElement {
  return (
    <>
      <Head>
        <title>Home | Seller | EmporioLambda</title>
      </Head>
    </>
  );
}

export async function getServerSideProps(context) {
  const { Auth } = withSSRContext(context);
  try {
    const { signInUserSession } = await Auth.currentAuthenticatedUser();

    if (await getSignedState(signInUserSession) === SignedState.Seller) {
      return {
        redirect: {
          destination: getOrderLink(true),
          permanent: false,
        },
      };
    }
  } catch (error) {
    return {
      redirect: {
        destination: getLoginLink(),
        permanent: false,
      },
    };
  }

  return {
    props: { },
  };
}

export default HomeSeller;
