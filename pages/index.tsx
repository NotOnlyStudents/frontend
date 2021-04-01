import React from 'react';
import { GetServerSideProps } from "next"
import { CognitoUser } from "@aws-amplify/auth"
import { withSSRContext } from 'aws-amplify'
import { AuthState } from '@aws-amplify/ui-components'
import Layout from 'components/Layout';

export default function Home({ _authState, _username }){
  return (
    <Layout _authState = {_authState} _username = {_username} title = "Home | EmporioLambda">
      <div>
        prova prova
        <a href="altraPage">Cliccami tutto!</a>
      </div>
    </Layout>
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