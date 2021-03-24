import Head from 'next/head'
import Link from 'next/link'
import React, { useEffect } from 'react';
import { GetServerSideProps, InferGetStaticPropsType } from "next"
import { CognitoUser } from "@aws-amplify/auth"
import { withSSRContext } from 'aws-amplify'
import { AmplifySignOut } from '@aws-amplify/ui-react'
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components'
import { useAuthContext } from "context/authContext"
import Layout from 'components/Layout';





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


export default function Pag({ _authState, _username }){
  return (
    <Layout _authState = {_authState} _username = {_username}>
      <div>
        prova prova
      </div>
    </Layout>
  )
}
